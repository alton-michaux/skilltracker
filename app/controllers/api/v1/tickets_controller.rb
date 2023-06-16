# frozen_string_literal: true

module Api
  module V1
    class Api::V1::TicketsController < ApplicationController
      def index
        current_user = User.find(user_params["user_id"])
        @tickets = current_user.tickets
      end

      private

      def user_params
        params.permit(:user_id)
      end

      def ticket_params
        params.require(:ticket).permit(:title, :description, :status, :assignee, :user_id)
      end
    end
  end
end
