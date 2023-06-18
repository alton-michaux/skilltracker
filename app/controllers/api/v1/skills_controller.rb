# frozen_string_literal: true

module Api
  module V1
    class SkillsController < ApplicationController
      include FormAuth

      before_action :get_current_user
      before_action :form_auth_token

      def index
        # skills = {}

        # UserSkill.all.each do |relation|
        #   if relation.user_id == @current_user.id
        #     matched_skill = Skill.find(relation.skill_id)
        #     skills[matched_skill.id] = matched_skill.name, matched_skill.description
        #   else
        #     next
        #   end
        # end

        render json: Skill.all, each_serializer: SkillSerializer, status: 200
      end

      def create
        @skill = Skill.new(user_id: @current_user.id)
        if @skill.save
          render json: { skill: SkillSerializer.new(@skill) }, status: 201
        else
          render json: @skill.errors.full_messages, status: 422
        end
      end

      def delete
        if @skill.destroy
          render json: { success: 'Skill destroyed' }, status: 200
        else
          render json: @skills.errors.full_messages, status: 422
        end
      end

      private

      def skill_params
        params.require(:skill).permit(:id, :name, :description, :user_id)
      end
    end
  end
end
