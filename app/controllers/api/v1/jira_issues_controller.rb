# frozen_string_literal: true

module Api
  module V1
    class JiraIssuesController < ApplicationController
      include FormAuth

      before_action :form_auth_token
      before_action :set_issue, only: :show
      before_action :fetch_jira_client

      def index
        response = @jira_client.get("#{base_url}/rest/api/2/search")

        body = JSON.parse(response.body)

        issues = body["issues"]
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

      private

      def set_issue
        @issue = @client.Issue.find(params[:id])
      end
    end
  end
end
