# frozen_string_literal: true

module Api
  module V1
    class MatchedSkillsController < ApplicationController
      include FormAuth

      before_action :form_auth_token, except: [:index]
      before_action :get_current_user

      def index
        @matched_skills = @current_user.matched_skills

        if @matched_skills.empty?
          render json: { error: 'No matched skills' }, status: 404
        else
          render json: @matched_skills, each_serializer: MatchedSkillSerializer, status: 200
        end
      end

      private

      def matched_skill_params
        params.require(:matched_skills).permit(:user_id, :skill_id, :proficiency, :endorsements)
      end
    end
  end
end