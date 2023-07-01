# frozen_string_literal: true

require 'oauth2'
require 'jira-ruby'

class ApplicationController < ActionController::Base
  include FormAuth

  attr_accessor :current_user, :client

  rescue_from JIRA::OauthClient::UninitializedAccessTokenError do
    redirect_to new_jira_session_url
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
      client_secret: client_secret
    }

    OAuth2::Client.new(client_id, client_secret, options)
  end

  def handle_auth
    csrf_token = form_authenticity_token

    request.headers['X-CSRF-Token'] = csrf_token

    if verified_request?
      # Step 1: Build headers and redirect to authorization url
      state = request.headers["HTTP_X_CSRF_TOKEN"]

      auth_url = "https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=#{ENV['CLIENT_ID']}&scope=read%3Ame&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&state=#{state}&response_type=code&prompt=consent&_csrf=#{csrf_token}"

      redirect_to auth_url
    else
      render json: { error: 'Request unverified' }, status: 401
    end
  end

  def handle_login
    # Step 2: Handle the callback from the authorization server
    return unless session_params[:code]
    
    client = oauth2_client

    # Step 3: Exchange the authorization code for an access token
    access_token = client.auth_code.get_token(params[:code], redirect_uri: 'http://localhost:3000/callback')

    # Step 4: Configure JIRA client with OAuth2 access token
    options = {
      auth_type: :oauth,
      consumer_key: ENV['CLIENT_ID'],
      consumer_secret: ENV['CLIENT_SECRET'],
      private_key_file: Rails.root.join('private_key.pem').to_s,
      site: 'http://localhost:3000' # Replace with your JIRA instance URL
    }
 
    @jira_client = JIRA::Client.new(options)
 
    # Add AccessToken if authorised previously.
    @jira_client.set_access_token(
      access_token.token,
      ENV['CLIENT_ID']
    )
  end

  def session_params
    params.permit(:code)
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
