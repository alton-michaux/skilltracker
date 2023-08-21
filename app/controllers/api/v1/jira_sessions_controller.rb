# frozen_string_literal: true

# app/controllers/jira_sessions_controller.rb
module Api
  module V1
    class JiraSessionsController < ApplicationController
      include FormAuth

      skip_before_action :verify_authenticity_token, only: %i[callback authorize]
      before_action :form_auth_token, only: [:callback]
      before_action :handle_csrf, only: :authorize
      before_action :fetch_oauth2_token, only: :callback
      before_action :fetch_session, only: :destroy

      def new
        callback_url = 'http://localhost:3000/callback'
        request_token = @oauth_token.request_token(oauth_callback: callback_url)
        session[:request_token] = request_token.token
        session[:request_secret] = request_token.secret

        redirect_to request_token.authorize_url
      end

      def authorize
        if verified_request?
          state = request.headers['HTTP_X_CSRF_TOKEN']
          @scopes = 'read:jira-work read:jira-user read:issue:jira read:issue-meta:jira read:priority:jira read:issue-type:jira read:issue-status:jira read:project:jira read:issue.time-tracking:jira read:me'

          auth_url = auth_string(ENV['CLIENT_ID'], state, @csrf_token, @scopes, @redirect)

          render json: { auth: auth_url }, status: 200
        else
          render json: { error: 'Request unverified' }, status: 401
        end
      end

      def callback
        # byebug
        if @oauth_token
          render component: 'routes/Callback', props: { success: true }, status: 200
        else
          render json: { error: 'Jira client invalid' }, status: 500
        end
      end

      def destroy
        jira_service = JiraService.new(@oauth_token)
        jira_service.delete_session(@session)

        redirect_to skills_path

        nil
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
        cloud_id = JSON.parse(response.body).first['id'] if response.status == 200

        session[:cloud_id] = cloud_id if cloud_id

        # Configure OAuth2.0 client with OAuth2 access token
        @oauth_token = OAuth2::AccessToken.new(client, access_token.token)

        session[:access_token] = access_token.token
      rescue OAuth2::Error => e
        render json: { error: e.message }, status: 500
      end
    end
  end
end
