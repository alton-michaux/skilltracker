# frozen_string_literal: true

require 'oauth2'
require 'uri'
require 'net/http'

class ApplicationController < ActionController::Base
  include FormAuth

  before_action :authenticate_api_v1_user!

  attr_accessor :current_user, :client

  def not_found
    render component: 'routes/NotFound', status: 404
  end

  def authorize_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    begin
      @decoded = JsonWebToken.decode(header)
      @current_user = User.find(@decoded[:user_id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e.message }, status: :unauthorized
    rescue JWT::DecodeError => e
      render json: { errors: e.message }, status: :unauthorized
    end
  end

  private

  def auth_string(client_id, state, token, scopes, redirect)
    "https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=#{client_id}&scope=#{CGI.escape(scopes)}&redirect_uri=#{redirect}&state=#{state}&response_type=code&prompt=consent&_csrf=#{token}"
  end

  def handle_csrf
    @csrf_token = form_authenticity_token

    request.headers['X-CSRF-Token'] = @csrf_token

    @csrf_token
  end
  
  def oauth2_client
    client_id = ENV['CLIENT_ID']
    client_secret = ENV['CLIENT_SECRET']

    options = {
      site: 'https://auth.atlassian.com',
      authorize_url: '/authorize',
      token_url: '/oauth/token',
      redirect_uri: 'http://localhost:3000/callback',
      client_id: client_id,
      client_secret: client_secret,
      scope: @scopes
    }

    @redirect = options[:redirect_uri]

    OAuth2::Client.new(client_id, client_secret, options)
  end

  def fetch_oauth2_token
    return unless session_params[:code]

    client = oauth2_client

    # Exchange the authorization code for an access token
    access_token = client.auth_code.get_token(session_params[:code], redirect_uri: 'http://localhost:3000/callback')

    # Fetch the cloudId using the access token
    response = access_token.get('https://api.atlassian.com/oauth/token/accessible-resources')
    cloud_id = JSON.parse(response.body).last['id'] if response.status == 200

    session[:cloud_id] = cloud_id if cloud_id

    # Configure OAuth2.0 client with OAuth2 access token
    @oauth_token = OAuth2::AccessToken.new(client, access_token.token)

    session[:access_token] = access_token.token
  rescue OAuth2::Error => e
    render json: { error: e.message }, status: 500
  end

  def api_layer(url, jira = false)
    url = URI(url)

    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true

    request = Net::HTTP::Get.new(url)

    if jira
      request['Authorization'] = "Bearer #{session[:access_token]}"
      request['Accept'] = "*/*"
    else
      request['apikey'] = ENV['SKILLS_API_KEY']
    end

    https.request(request)
  end

  def base_url
    "https://api.atlassian.com/ex/jira/#{session[:cloud_id]}"
  end

  def session_params
    params.permit(:code, :state)
  end

  def user_params
    params.permit(:user_id)
  end

  def fetch_current_user
    @current_user = User.find(user_params['user_id'])
  end

  def fetch_session
    @session = params[:jira_session]
  end
end
