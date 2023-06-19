# frozen_string_literal: true

module Api
  module V1
    class TicketsController < ApplicationController
      include FormAuth

      before_action :form_auth_token, except: [:index]
      before_action :get_current_user

      def index
        @tickets = @current_user.tickets

        if !@tickets.empty?
          render json: @tickets, each_serializer: TicketSerializer, status: 200
        else
          render json: { error: "Not found" }, status: 404
        end
      end

      private

      def ticket_params
        params.require(:ticket).permit(:title, :description, :status, :assignee, :user_id)
      end
    end
  end
end
