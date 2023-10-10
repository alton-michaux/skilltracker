# frozen_string_literal: true

module Api
  module V1
    class SkillsController < ApplicationController
      include FormAuth

      before_action :form_auth_token
      before_action :authenticate_api_v1_user!
      before_action :authorize_request
      before_action :set_skill, only: [:delete]

      def index
        search
      end

      def create
        @skill = Skill.new(skill_params)
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
          render json: { error: 'Skill not found' }, status: 404
        end
      end

      def search
        query = request.query_parameters.first[0]

        count = 100

        response = api_layer("https://api.apilayer.com/skills?q=#{query}&count=#{count}")

        skills = JSON.parse(response.body)

        render json: { skills: skills }, status: 200
      end

      private

      def set_skill
        @skill = Skill.find(params['id'])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'No Record found or not active' }, status: 404
      end

      def skill_params
        params.require(:skill).permit(:id, :name)
      end

      def search_params
        params.permit(:query)
      end
    end
  end
end
