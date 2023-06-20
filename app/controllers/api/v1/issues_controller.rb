module Api
  module V1
    class IssuesController < ApplicationController
      include FormAuth

      before_action :form_auth_token
      before_filter :get_jira_client

      def index
        @issues = @jira_client.Issue.all
      end

      def show
        @issue = @jira_client.Issue.find(params[:id])
      end
    end
  end
end
