# frozen_string_literal: true

# spec/requests/blogs_spec.rb
require 'swagger_helper'

describe 'Skills API' do
  let!(:user1) { create(:user) }
  let!(:skill1) { create(:skill, name: 'Skill1', description: 'Skill description') }
  let!(:matched_skill) { create(:matched_skill, user_id: user1.id, skill_id: skill1.id, proficiency: 2, endorsements: 23) }

  path '/api/v1/users/{id}/skills' do
    get 'Retrieves all matched skills' do
      tags 'Skills', 'Users'
      produces 'application/json', 'application/xml'
      parameter name: :user_id, in: :path, type: :string

      response '200', 'skills found' do
        schema type: :object,
               properties: {
                 id: { type: :integer },
                 proficiency: { type: :integer },
                 endorsements: { type: :integer }
               },
               required: %w[id proficiency]

        run_test!
      end

      response '404', 'skill not found' do
        let(:user) { 'invalid' }
        run_test!
      end
    end
  end
end
