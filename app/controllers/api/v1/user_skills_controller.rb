# frozen_string_literal: true

module Api
  module V1
    class Api::V1::UserSkillsController < ApplicationController
      before_action :get_current_user

      attr_accessor :user_skills

      def index
        @user_skills = UserSkill.where(user_id: @current_user.id)
      end

      private

      def user_params
        params.permit(:user_id)
      end

      def get_current_user
        @current_user = User.find(user_params["user_id"])
      end
    end
  end
end

