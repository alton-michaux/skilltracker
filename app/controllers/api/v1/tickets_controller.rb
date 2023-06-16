# frozen_string_literal: true

module Api
  module V1
    class Api::V1::TicketsController < ApplicationController
      before_action :get_current_user

      def index
        @tickets = @current_user.tickets
      end

      private

      def ticket_params
        params.require(:ticket).permit(:title, :description, :status, :assignee, :user_id)
      end
    end
  end
end
