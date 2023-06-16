# spec/requests/blogs_spec.rb
require 'swagger_helper'

describe 'Skills API' do
  let!(:user1) { create(:user) }
  let!(:skill1) { create(:skill, name: 'Skill1', description: 'Skill description')}

  path '/api/v1/users/{id}/skills' do

    get 'Retrieves all skills' do
      tags 'Skills'
      produces 'application/json', 'application/xml'
      parameter name: :user_id, in: :path, type: :string
      parameter name: :id, in: :path, type: :string

      response '200', 'skills found' do
        schema type: :object,
          properties: {
            id: { type: :integer },
            name: { type: :string },
            description: { type: :string }
          },
          required: [ 'id', 'title' ]

        let(:id) { skill1.id }
        run_test!
      end

      response '404', 'skill not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end

    post 'Creates a Skill' do
      tags 'Skills'
      consumes 'application/json'
      parameter name: :user_id, in: :path, type: :string
      parameter name: :skill, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          description: { type: :string }
        },
        required: [ 'name', 'description' ]
      }

      response '201', 'skill created' do
        let(:skill) { { name: 'foo', description: 'bar' } }
        run_test!
      end

      response '422', 'invalid request' do
        let(:skill) { { name: 'foo' } }
        run_test!
      end
    end
  end

  path '/api/v1/users/{id}/skills/{id}' do
    let!(:skill) { Skill.create(name: 'Fishing', description: 'Catching fish with a pole')}

    get 'Retrieves a skill' do
      tags 'Skills'
      produces 'application/json', 'application/xml'
      parameter name: :user_id, in: :path, type: :string
      parameter name: :id, in: :path, type: :string

      response '200', 'skill found' do
        schema type: :object,
          properties: {
            id: { type: :integer },
            name: { type: :string },
            description: { type: :string }
          },
          required: [ 'id', 'title' ]

        let(:id) { skill1.id }
        run_test!
      end

      response '404', 'skill not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
    
    put 'Updates a skill' do
      tags 'Skills'
      consumes 'application/json'
      parameter name: :user_id, in: :path, type: :string
      parameter name: :id, in: :path, type: :string
      parameter name: :skill, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          description: { type: :string }
        },
        required: [ 'name', 'description' ]
      }

      response '200', 'skill updated' do
        schema type: :object,
               properties: {
                 skill: { type: :object },
               },
               required: ['skill']
        let(:id) { skill1.id }
        let(:name) { 'Juggling' }
        run_test! do | response |
          data = JSON.parse(response.body)
          expect(data['skill']['name']).to eq 'Juggling'
        end
      end

      response '404', 'skill not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
    
    delete 'Deletes a skill' do
      tags 'Skills'
      consumes 'application/json'
      parameter name: :user_id, in: :path, type: :string
      parameter name: :id, in: :path, type: :string

      response '200', 'skill deleted' do
        let(:id) { skill1.id }
        run_test!
      end

      response '404', 'skill not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end
end
