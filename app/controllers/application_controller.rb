# frozen_string_literal: true
require 'oauth2'
require 'jira-ruby'

class ApplicationController < ActionController::Base
  attr_accessor :current_user, :client

  rescue_from JIRA::OauthClient::UninitializedAccessTokenError do
    redirect_to new_jira_session_url
  end

  private

  def oauth2_client
    client_id = ENV['CLIENT_ID']
    client_secret = ENV['CLIENT_SECRET']
    site = 'http://localhost:3000' # Replace with your JIRA instance URL
  
    OAuth2::Client.new(client_id, client_secret, site: site)
  end

  def get_jira_client
    client = oauth2_client

    # Step 1: Redirect the user to the authorization URL
    authorize_url = client.auth_code.authorize_url(redirect_uri: 'http://localhost:3000/jira_issues')
    redirect_to authorize_url
  
    # Step 2: Handle the callback from the authorization server
    if params[:code]
      # Step 3: Exchange the authorization code for an access token
      access_token = client.auth_code.get_token(params[:code], redirect_uri: 'http://localhost:3000/jira_issues')
  
      # Step 4: Configure JIRA client with OAuth2 access token
      options = {
        :access_token => access_token.token,
        :site => 'http://localhost:3000' # Replace with your JIRA instance URL
      }
      @jira_client = JIRA::Client.new(options)
    end
  end

  def user_params
    params.permit(:user_id)
  end

  def get_current_user
    @current_user = User.find(user_params['user_id'])
  end
end
