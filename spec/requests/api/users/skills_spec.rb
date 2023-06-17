# spec/requests/blogs_spec.rb
require 'swagger_helper'

describe 'Skills API' do
  let!(:user1) { create(:user) }

  path '/api/v1/users/{user_id}/skills' do
    let!(:skill1) { create(:skill) }
    let!(:user_skill1) { create(:user_skill, user: user1, skill: skill1 )}
    get 'Retrieves all skills' do
      tags 'Skills'
      produces 'application/json'
      parameter name: :user_id, in: :path, type: :string, required: true

      response '200', 'skills found' do
        schema type: :object,
               properties: {
                 id: { type: :integer },
                 name: { type: :string },
                 description: { type: :string }
               },
               required: ['id']

        run_test!
      end

      response '404', 'skill not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end

  path '/api/v1/skills' do
    let(:skill) { { name: 'foo', description: 'bar' } }
    let!(:user_skill1) { create(:user_skill, user_id: user1.id, skill_id: skill1.id )}
  
    post 'Creates a Skill' do
      tags 'Skills'
      consumes 'application/json'
      parameter name: :skill, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          description: { type: :string }
        },
        required: %w[name description]
      }
      let!(:id) { user1.id }

      response '201', 'skill created' do
        run_test!
      end

      response '401', 'unauthorized' do
        let(:user) { nil }
        run_test!
      end
    end
  end

  # path '/api/v1/users/{user_id}/skills/{id}' do
    # get 'Retrieves a skill' do
    #   tags 'Skills'
    #   produces 'application/json', 'application/xml'
    #   parameter name: :user_id, in: :path, type: :string, required: true
    #   parameter name: :id, in: :path, type: :string, required: true

    #   response '200', 'skill found' do
    #     schema type: :object,
    #            properties: {
    #              id: { type: :integer },
    #              name: { type: :string },
    #              description: { type: :string }
    #            },
    #            required: %w[id title description]

    #     let(:id) { skill.id }
    #     run_test!
    #   end

    #   response '404', 'skill not found' do
    #     let(:id) { 'invalid' }
    #     run_test!
    #   end
    # end

    # put 'Updates a skill' do
    #   tags 'Skills'
    #   consumes 'application/json'
    #   parameter name: :user_id, in: :path, type: :string, required: true
    #   parameter name: :id, in: :path, type: :string, required: true
    #   parameter name: :skill, in: :body, schema: {
    #     type: :object,
    #     properties: {
    #       id: { type: :integer },
    #       name: { type: :string },
    #       description: { type: :string }
    #     },
    #     required: %w[id name description]
    #   }

    #   response '200', 'skill updated' do
    #     schema type: :object,
    #            properties: {
    #              skill: { type: :object }
    #            },
    #            required: ['skill']

    #     let(:id) { skill.id }
    #     let(:name) { 'Juggling' }

    #     run_test! do |response|
    #       data = JSON.parse(response.body)
    #       expect(data['skill']['name']).to eq 'Juggling'
    #     end
    #   end

    #   response '404', 'skill not found' do
    #     let(:id) { 'invalid' }
    #     run_test!
    #   end
    # end
  # end
  
  path '/api/v1/skills/{id}' do
    let!(:skill) { Skill.create(name: 'Fishing', description: 'Catching fish with a pole') }
    let!(:user_skill2) { create(:user_skill, user_id: user1.id, skill_id: skill.id )}

    delete 'Deletes a skill' do
      tags 'Skills'
      consumes 'application/json'
      parameter name: :id, in: :path, type: :string, required: true

      response '200', 'skill deleted' do
        let(:id) { skill.id }
        run_test!
      end

      response '404', 'skill not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end
end
