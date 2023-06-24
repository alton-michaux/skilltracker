# frozen_string_literal: true

# app/controllers/jira_sessions_controller.rb
module Api
  module V1
    class JiraSessionsController < ApplicationController
      include FormAuth

      before_action :form_auth_token
      before_action :fetch_jira_client, only: %i[new authorize]
      before_action :fetch_session, only: :destroy

      def new
        callback_url = 'http://localhost:3000'
        request_token = @jira_client.request_token(oauth_callback: callback_url)
        session[:request_token] = request_token.token
        session[:request_secret] = request_token.secret

        redirect_to request_token.authorize_url
      end

      def authorize
        jira_service = JiraService.new(@jira_client)
        jira_auth = jira_service.create_session(session[:request_token], session[:request_secret])

        session[:jira_auth] = jira_auth

        session.delete(:request_token)
        session.delete(:request_secret)

        redirect_to projects_path
      end

      def callback
        redirect_to jira_issues_path
      end

      def destroy
        jira_service = JiraService.new(@jira_client)
        jira_service.delete_session(@session)

        redirect_to skills_path
      end
    end
  end
end
