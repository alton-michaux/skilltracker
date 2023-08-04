# frozen_string_literal: true

require 'oauth2'
require 'jira-ruby'

class ApplicationController < ActionController::Base
  include FormAuth

  attr_accessor :current_user, :client

  rescue_from JIRA::OauthClient::UninitializedAccessTokenError do
    redirect_to new_jira_session_url
  end

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
      scope: 'read:jira-work read:jira-user read:me'
    }

    @redirect = options[:redirect_uri]

    OAuth2::Client.new(client_id, client_secret, options)
  end

  def auth_string(client_id, state, token, scopes)
    "https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=#{client_id}&scope=#{CGI.escape(scopes)}&redirect_uri=#{@redirect}&state=#{state}&response_type=code&prompt=consent&_csrf=#{token}"
  end

  def handle_csrf
    @csrf_token = form_authenticity_token

    request.headers['X-CSRF-Token'] = @csrf_token

    @csrf_token
  end

  def fetch_jira_client
    # Step 2: Handle the callback from the authorization server
    return unless session_params[:code]

    client = oauth2_client

    # Step 3: Exchange the authorization code for an access token
    access_token = client.auth_code.get_token(session_params[:code], redirect_uri: 'http://localhost:3000/callback')

    # Step 4: Configure JIRA client with OAuth2 access token
    options = {
      site: 'https://your-jira-instance-url', # Replace with the base URL of your Jira instance
      context_path: '/jira',
      rest_base_path: '/rest/api/2',
      ssl_verify_mode: 1,
      use_ssl: true,
      use_client_cert: false,
      http_debug: false,
      default_headers: {}
    }

    @jira_client = OAuth2::AccessToken.new(client, access_token.token)

    return unless session[:jira_auth]

    # Optionally, you may want to store the access token in the session for future use.
    # In a real-world application, you might want to persist this securely.
    session[:access_token] = access_token.token
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
