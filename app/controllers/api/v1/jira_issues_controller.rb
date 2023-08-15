# frozen_string_literal: true

module Api
  module V1
    class JiraIssuesController < ApplicationController
      include FormAuth

      before_action :form_auth_token
      before_action :set_issue, only: :show
      before_action :fetch_jira_client

      def index
        query_params = {
          jql: "assignee = currentUser() AND status != Resolved",
          maxResults: 50
        }
# byebug
        response = @jira_client.get("#{base_url}/rest/api/2/search")

        body = parse_response(response)

        issues = body['issues']

        issues.map { |issue| Ticket.new(user_id: current_user.id, ticket: issue) }
        # @issues = @jira_client.Issue.all
        render json: { issues: issues }, status: 200
      end

      def show
        if @issue
          render json: { issue: @issue }, status: 200
        else
          render json: { error: 'Issue not found' }, status: 404
        end
      end

      def get_projects
        response = @jira_client.get("#{base_url}/rest/api/2/issue/createmeta")

        body = parse_response(response)
      end

      private

      def set_issue
        @issue = @client.Issue.find(params[:id])
      end

      def fetch_jira_client
        client_id = ENV["CLIENT_ID"]
        client_secret = ENV["CLIENT_SECRET"]

        cloud_id = session[:cloud_id]

        access_token = session[:access_token] || @oauth_token.token

        @jira_client = JIRA::Client.new(
          username: nil,
          password: nil,
          auth_type: :oauth_2legged,
          site: "https://#{cloud_id}.atlassian.net",
          context_path: '/rest/api/2',
          default_headers: { 'Authorization' => "Bearer #{access_token}" },
          consumer_key: client_id,
          consumer_secret: client_secret,
          private_key_file: Rails.root.join('private_key.pem').to_s
        )
    
        @jira_client.set_access_token(
          access_token,
          client_secret
        )
      end
    end
  end
end
