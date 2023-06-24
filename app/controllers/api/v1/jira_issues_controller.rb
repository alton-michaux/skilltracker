# frozen_string_literal: true

module Api
  module V1
    class JiraIssuesController < ApplicationController
      include FormAuth

      before_action :form_auth_token
      before_action :get_jira_client
      before_action :set_issue, only: :show

      def index
        @issues = @jira_client.Issue.all
      end

      def show
        if @issue
          render json: { issue: @issue }, status: 200
        else
          render json: { error: "Issue not found" }, status: 404
        end
      end

      private

      def set_issue
        @issue = @client.Issue.find(params[:id])
      end
    end
  end
end
