# frozen_string_literal: true

module Api
  module V1
    class Api::V1::SkillsController < ApplicationController
      before_action :get_current_user

      def index
        @skills = UserSkill.all.find_by(user_id: @current_user.id)
      end

      def create
        @skill = Skill.create(user_id: @current_user.id)
      end

      private

      def user_params
        params.permit(:user_id)
      end

      def skill_params
        params.require(:skill).permit(:name, :description, :user_id)
      end

      def get_current_user
        @current_user = User.find(user_params["user_id"])
      end
    end
  end
end
