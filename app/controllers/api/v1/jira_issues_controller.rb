# frozen_string_literal: true

module Api
  module V1
    class JiraIssuesController < ApplicationController
      include FormAuth

      before_action :form_auth_token
      before_action :set_issue, only: :show

      def index
        response = api_layer("#{base_url}/rest/api/2/issue", true)

        body = JSON.parse(response.body)

        issues = body['issues']

        # issues.map { |issue| Ticket.new(user_id: current_user.id, ticket: issue) }

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

      def projects
        response = api_layer("#{base_url}/rest/api/2/project", true)

        body = JSON.parse(response.body)
      rescue JIRA::HTTPError => e
        render json: { error: e.message }
      end

      private

      def set_issue
        @issue = @client.Issue.find(params[:id])
      end
    end
  end
end
