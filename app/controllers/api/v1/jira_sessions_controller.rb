# frozen_string_literal: true

# app/controllers/jira_sessions_controller.rb
module Api
  module V1
    class JiraSessionsController < ApplicationController
      include FormAuth

      skip_before_action :verify_authenticity_token, only: %i[callback authorize]
      before_action :form_auth_token, only: [:callback]
      before_action :handle_csrf, only: :authorize
      before_action :fetch_jira_client, only: :callback
      before_action :fetch_session, only: :destroy

      def new
        callback_url = 'http://localhost:3000/callback'
        request_token = @jira_client.request_token(oauth_callback: callback_url)
        session[:request_token] = request_token.token
        session[:request_secret] = request_token.secret

        redirect_to request_token.authorize_url
      end

      def authorize
        if verified_request?
          state = request.headers['HTTP_X_CSRF_TOKEN']

          auth_url = auth_string(ENV['CLIENT_ID'], state, @csrf_token)

          render json: { auth: auth_url }, status: 200
        else
          render json: { error: 'Request unverified' }, status: 401
        end
      end

      def callback
        if @jira_client
          base_url = base_url

          render component: 'routes/Callback', props: { client: @jira_client }, status: 200
        else
          render json: { error: 'Jira client invalid' }, status: 500
        end
      end

      def destroy
        jira_service = JiraService.new(@jira_client)
        jira_service.delete_session(@session)

        redirect_to skills_path

        nil
      end

      def base_url
        response = @jira_client.get('https://your-site.atlassian.net/_edge/tenant_info').response

        body = JSON.parse(response.body)

        cloud_id = body["cloudId"]

        "https://#{cloud_id}.atlassian.net"
      end
    end
  end
end
