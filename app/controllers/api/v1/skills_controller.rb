# frozen_string_literal: true

module Api
  module V1
    class SkillsController < ApplicationController
      include FormAuth

      before_action :form_auth_token
      before_action :set_skill, only: [:delete]

      def index
        skill_query = "ruby"
        count = 100
  
        response = api_layer("https://api.apilayer.com/skills?q=#{skill_query}&count=#{count}")

        skills = JSON.parse(response.body)

        render json: skills, status: 200
      end

      # def create
      #   @skill = Skill.new(skill_params)
      #   if @skill.save
      #     render json: { skill: SkillSerializer.new(@skill) }, status: 201
      #   else
      #     render json: @skill.errors.full_messages, status: 422
      #   end
      # end

      # def delete
      #   if @skill.destroy
      #     render json: { success: 'Skill destroyed' }, status: 200
      #   else
      #     render json: { error: 'Skill not found' }, status: 404
      #   end
      # end

      private

      def set_skill
        @skill = Skill.find(params['id'])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'No Record found or not active' }, status: 404
      end

      def skill_params
        params.require(:skill).permit(:id, :name, :description)
      end
    end
  end
end
