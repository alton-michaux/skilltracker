# frozen_string_literal: true

module Api
  module V1
    class TicketsController < ApplicationController
      include FormAuth

      before_action :form_auth_token
      before_action :set_ticket, only: [:show]
      before_action :fetch_current_user

      def index
        @tickets = @current_user.tickets

        if !@tickets.empty?
          render json: @tickets, each_serializer: TicketSerializer, status: 200
        else
          render json: { error: 'Not found' }, status: 404
        end
      end

      def show
        render json: { ticket: TicketSerializer.new(@ticket) }, status: 200
      end

      private

      def set_ticket
        @ticket = Ticket.find(params['id'])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'No Record found or not active' }, status: 404
      end

      def ticket_params
        params.require(:ticket).permit(:title, :description, :status, :assignee, :user_id)
      end
    end
  end
end
