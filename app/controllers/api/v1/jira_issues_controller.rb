# frozen_string_literal: true

module Api
  module V1
    class JiraIssuesController < ApplicationController
      include FormAuth

      before_action :form_auth_token
      before_action :get_jira_client
      before_action :set_issue, only: :show

      def index
        @issues = @client.Issue.all
      end

      def show
        @issue
      end

      private

      def set_issue
        @issue = @client.Issue.find(params[:id])
      end
    end
  end
end
