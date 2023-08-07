# frozen_string_literal: true

# spec/requests/blogs_spec.rb
require 'swagger_helper'

describe 'Skills API' do
  let!(:user) { create(:user) }
  let!(:user2) { create(:user, email: 'UserTester@email.com') }
  let!(:skill) { create(:skill, name: 'skill', description: 'Skill description') }
  let!(:matched_skill) { create(:matched_skill, user_id: user.id, skill_id: skill.id) }

  path '/api/v1/users/{user_id}/matched_skills' do
    get 'Query matched skill data' do
      tags 'Skills', 'Users'
      produces 'application/json'
      parameter name: :user_id, in: :path, type: :string

      response '200', 'Return correct information based on query' do
        schema type: :array,
               items: {
                 type: :object,
                 properties: {
                   id: { type: :integer },
                   proficiency: { type: :integer },
                   endorsements: { type: :integer }
                 }
               }

        let(:user_id) { user.id }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data[0]['proficiency']).to eq matched_skill.proficiency
          expect(data[0]['endorsements']).to eq matched_skill.endorsements
          expect(data[0]['user']['email']).to eq user.email
          expect(data[0]['skill']['name']).to eq skill.name
        end
      end

      # response '404', 'Not found' do
      #   let(:user_id) { user2.id }
      #   run_test!
      # end
    end
  end
end
