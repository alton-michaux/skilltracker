# frozen_string_literal: true

module Api
  module V1
    class Api::V1::SkillsController < ApplicationController
      before_action :get_current_user

      def index
        @skills = UserSkill.all.find_by(user_id: @current_user.id)
      end

      def show
        @skill = Skill.find(skill_params[:id])
      end

      def create
        @skill = Skill.create(user_id: @current_user.id)
      end

      private

      def skill_params
        params.require(:skill).permit(:id, :name, :description, :user_id)
      end
    end
  end
end
