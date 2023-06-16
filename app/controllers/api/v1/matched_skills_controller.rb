# frozen_string_literal: true

module Api
  module V1
    class Api::V1::MatchedSkillsController < ApplicationController
      def index
        current_user = User.find(user_params['user_id'])
        @matched_skills = current_user.matched_skills
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
