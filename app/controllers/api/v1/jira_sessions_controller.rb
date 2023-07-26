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
          jira_service = JiraService.new(@jira_client)

          jira_service.request_token_set(session)

          # jira_service.access_token_set(session, params)

          jira_auth = jira_service.create_session(session[:request_token], session[:request_secret])

          session[:jira_auth] = jira_auth

          @jira_client.set_access_token(
            session[:jira_auth]['access_token'],
            session[:jira_auth]['access_key']
          )

          session.delete(:request_token)
          session.delete(:request_secret)

          # byebug

          render component: 'pages/Callback', props: { client: @jira_client }, status: 200
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
    end
  end
end
