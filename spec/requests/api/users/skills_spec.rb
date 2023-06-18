# spec/requests/blogs_spec.rb
require 'swagger_helper'

describe 'Skills API' do
  let!(:user) { create(:user) }
  let!(:skill) { create(:skill) }
  let!(:skill2) { create(:skill, :javascript) }

  path '/api/v1/users/{user_id}/skills' do
    get 'Query skill data' do
      tags 'Skills'
      produces 'application/json'
      parameter name: :user_id, in: :path, type: :string, required: true

      response '200', 'Return correct information based on query' do
        schema type: :array,
               properties: {
                 id: { type: :integer },
                 name: { type: :string },
                 description: { type: :string }
               },
               required: %w[id name description]
        let!(:user_skill) { create(:user_skill, user: user, skill: skill )}
        let!(:user_skill2) { create(:user_skill, user: user, skill: skill2 )}
        let!(:user_id) { user.id }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data[0]["id"]).to eq skill.id
          expect(data[0]["name"]).to eq skill.name
          expect(data[0]["description"]).to eq skill.description
        end
      end

      response '404', 'skill not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end

  path '/api/v1/skills' do
    let!(:skill) { create(:skill) }
    let!(:user_skill) { create(:user_skill, user_id: user.id, skill_id: skill.id )}
  
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
      let!(:id) { user.id }

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
    let!(:user_skill2) { create(:user_skill, user_id: user.id, skill_id: skill.id )}

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
