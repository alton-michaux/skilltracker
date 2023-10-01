# frozen_string_literal: true

module Api
  module V1
    class UserSkillsController < ApplicationController
      include FormAuth

      before_action :form_auth_token
      before_action :authenticate_api_v1_user!
      before_action :fetch_current_user

      attr_accessor :user_skills

      def index
        @user_skills = UserSkill.where(user_id: @current_user.id)

        render json: @user_skills, each_serializer: UserSkillSerializer, status: 200
      end
    end
  end
end
