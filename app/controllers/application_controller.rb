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
    # client_id = ENV['CLIENT_ID']
    # client_secret = ENV['CLIENT_SECRET']

    options = {
      consumer_key: 'test',
      private_key_file: Rails.root.join('private_key.pem').to_s,
      site: 'http://localhost:3000',
      context_path: '',
      signature_method: 'RSA-SHA1'
    }

    OAuth2::Client.new(options)
  end

  def handle_auth
    state = request.headers["action_dispatch.request.unsigned_session_cookie"]["session_id"]

    # # Step 1: Redirect the user to the authorization URL
    auth_url = "https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=#{ENV['CLIENT_ID']}&scope=read%3Ame&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&state=#{state}&response_type=code&prompt=consent"

    # CURRENT PROBLEM AREA (TOO MANY REDIRECTS)
    redirect_to auth_url
  end

  def handle_login
    # Step 2: Handle the callback from the authorization server
    return unless session_params[:code]

    # Step 3: Exchange the authorization code for an access token
    access_token = client.auth_code.get_token(params[:code], redirect_uri: 'http://localhost:3000/callback')

    # Step 4: Configure JIRA client with OAuth2 access token
    options = {
      access_token: access_token.token,
      site: 'http://localhost:3000' # Replace with your JIRA instance URL
    }
    @jira_client = JIRA::Client.new(options)
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


# consumer_key: ENV["CLIENT_ID"],
# private_key_file: Rails.root.join('private_key.pem').to_s,
# signature_method: 'RSA-SHA1',
# site: 'http://localhost:3000' # Replace with your JIRA instance URL
