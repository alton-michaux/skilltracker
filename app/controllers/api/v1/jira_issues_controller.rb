module Api
  module V1
    class JiraIssuesController < ApplicationController
      include FormAuth

      before_action :form_auth_token
      before_action :get_jira_client

      def index
        @issues = @jira_client.Issue.all
      end

      def show
        @issue = @jira_client.Issue.find(params[:id])
      end
    end
  end
end
