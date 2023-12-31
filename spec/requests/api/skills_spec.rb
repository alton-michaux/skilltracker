# frozen_string_literal: true

# spec/requests/blogs_spec.rb
require 'swagger_helper'

describe 'Skills API' do
  let!(:user) { create(:user) }
  let!(:skill) { create(:skill) }
  let!(:skill2) { create(:skill, :javascript) }

  # path '/api/v1/skills' do
  # get 'Query skill data' do
  #   tags 'Skills'
  #   produces 'application/json'

  #   response '200', 'Return correct information based on query' do
  #     schema type: :array,
  #            properties: {
  #              id: { type: :integer },
  #              name: { type: :string }
  #            },
  #            required: %w[id name]

  #     run_test! do |response|
  #       data = JSON.parse(response.body)
  #       expect(data[0]['id']).to eq skill.id
  #       expect(data[1]['name']).to eq skill2.name
  #     end
  #   end
  # end

  #   post 'Creates a Skill' do
  #     tags 'Skills'
  #     consumes 'application/json'
  #     parameter name: :skill, in: :body, schema: {
  #       type: :object,
  #       properties: {
  #         name: { type: :string }
  #       },
  #       required: %w[name]
  #     }
  #     let!(:skill) { build(:skill, name: 'Python') }

  #     response '201', 'skill created' do
  #       run_test! do |response|
  #         JSON.parse(response.body)
  #       end
  #     end
  #   end
  # end

  # path '/api/v1/skills/{id}' do
  #   delete 'Deletes a skill' do
  #     tags 'Skills'
  #     consumes 'application/json'
  #     parameter name: :id, in: :path, type: :string, required: true

  #     response '200', 'skill deleted' do
  #       let(:id) { skill.id }
  #       run_test!
  #     end

  #     response '404', 'skill not found' do
  #       let(:id) { 'invalid' }
  #       run_test!
  #     end
  #   end
  # end
end
