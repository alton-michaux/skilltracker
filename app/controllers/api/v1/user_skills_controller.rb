# frozen_string_literal: true

module Api
  module V1
    class UserSkillsController < ApplicationController
      include FormAuth

      before_action :form_auth_token
      before_action :fetch_current_user

      attr_accessor :user_skills

      def index
        @user_skills = UserSkill.where(user_id: @current_user.id)

        if !@user_skills.empty?
          render json: @user_skills, each_serializer: UserSkillSerializer, status: 200
        else
          render json: { error: 'Not found' }, status: 404
        end
      end
    end
  end
end
