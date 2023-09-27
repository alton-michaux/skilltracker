# frozen_string_literal: true

module Api
  module V1
    class JiraIssuesController < ApplicationController
      include FormAuth

      before_action :form_auth_token
      before_action :set_issue, only: :show

      def index
        response = api_layer("#{base_url}/rest/api/2/search?jql=assignee=currentuser()", true)

        body = JSON.parse(response.body)

        issues = body['issues']

        issues.each do |issue|
          ticket = {
            title: issue["fields"]["summary"].strip,
            status: convert_status(issue["fields"]["status"]["statusCategory"]["name"]),
            description: issue["fields"]["customfield_10051"],
            labels: issue["fields"]["labels"].map(&:capitalize),
            assignee: issue["fields"]["assignee"]["displayName"],
            user_id: 1
          }

          Ticket.create(ticket) unless Ticket.find_by(title: ticket[:title])
        end

        render json: Ticket.all, each_serializer: TicketSerializer, status: 200
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

      def convert_status(status)
        case status
        when "To Do"
          return 0
        when "In Progress"
          return 1
        when "In Review"
          return 2
        when "Complete"
          return 3
        else
          return 4
        end
      end
    end
  end
end
