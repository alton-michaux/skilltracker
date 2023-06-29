# frozen_string_literal: true

# app/controllers/jira_sessions_controller.rb
module Api
  module V1
    class JiraSessionsController < ApplicationController
      include FormAuth

      skip_before_action :verify_authenticity_token, only: %i[callback authorize]
      before_action :form_auth_token, only: [:callback]
      before_action :handle_auth, only: :authorize
      before_action :handle_login, only: :callback
      before_action :fetch_session, only: :destroy

      def new
        callback_url = 'http://localhost:3000/callback'
        request_token = @jira_client.request_token(oauth_callback: callback_url)
        session[:request_token] = request_token.token
        session[:request_secret] = request_token.secret

        redirect_to request_token.authorize_url
      end

      def authorize;end

      def callback
        if @jira_client
          # byebug
          jira_service = JiraService.new(@jira_client)

          jira_service.request_token_set(session)
          jira_service.access_token_set(session, params)

          jira_auth = jira_service.create_session(session[:request_token], session[:request_secret])
          
          session[:jira_auth] = jira_auth

          # session[:jira_auth] = {
          #   :access_token => access_token.token,
          #   :access_key => access_token.secret
          # }
 
          session.delete(:request_token)
          session.delete(:request_secret)
          
          render json: { session: session }, status: 200
          # redirect_to api_v1_jira_issues_path
        else
          render json: { error: 'Jira client not created' }, status: 500
        end
      end      

      def destroy
        jira_service = JiraService.new(@jira_client)
        jira_service.delete_session(@session)

        redirect_to skills_path

        return
      end
    end
  end
end
