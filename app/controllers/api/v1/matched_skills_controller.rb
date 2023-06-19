# frozen_string_literal: true

module Api
  module V1
    class MatchedSkillsController < ApplicationController
      before_action :get_current_user

      def index
        @matched_skills = @current_user.matched_skills

        unless @matched_skills.empty?
          render json: @matched_skills, each_serializer: MatchedSkillSerializer, status: 200
        else
          render json: { error: "No matched skills" }, status: 404
        end
      end

      private

      def user_params
        params.permit(:user_id)
      end

      def matched_skill_params
        params.require(:matched_skills).permit(:user_id, :skill_id, :proficiency, :endorsements)
      end
    end
  end
end
