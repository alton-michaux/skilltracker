# frozen_string_literal: true

module Api
  module V1
    class JiraIssuesController < ApplicationController
      include FormAuth

      before_action :form_auth_token
      before_action :set_issue, only: :show
      before_action :fetch_jira_client, only: :index

      def index
        response = parse_response(@jira_client.get("#{base_url}/rest/api/2/issue/picker"))

        issues = response['sections'][0]['issues']

        issues.map { |issue| Ticket.new(user_id: current_user.id, ticket: issue) }

        render json: Ticket.all, each_serializer: TicketSerializer, status: 200
      rescue JIRA::HTTPError => e
        render json: { error: e.message }
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

        parse_response(response)
      end

      private

      def set_issue
        @issue = @client.Issue.find(params[:id])
      end
    end
  end
end
