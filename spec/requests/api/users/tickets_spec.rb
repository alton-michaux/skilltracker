# frozen_string_literal: true

# spec/requests/blogs_spec.rb
require 'swagger_helper'

describe 'Tickets API' do
  let!(:user1) { create(:user) }
  let!(:skill1) { create(:skill, name: 'Juggling', description: 'Juggles') }

  path '/api/v1/users/{id}/tickets' do
    get 'Retrieves all tickets' do
      tags 'Tickets'
      produces 'application/json'
      parameter name: :id, in: :path, type: :string

      response '200', 'tickets found' do
        schema type: :object,
               properties: {
                 id: { type: :integer },
                 title: { type: :string },
                 description: { type: :text },
                 status: { type: :integer },
                 assignee: { type: :string }
               },
               required: %w[id]

        run_test!
      end

      response '404', 'skill not found' do
        let(:user) { 'invalid' }
        run_test!
      end
    end

    post 'Creates a Ticket' do
      tags 'Tickets'
      consumes 'application/json'
      parameter name: :id, in: :path, type: :string
      parameter name: :skill, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          description: { type: :string }
        },
        required: %w[name description]
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

  path '/api/v1/users/{id}/tickets/{id}' do
    let!(:skill) { Skill.create(name: 'Fishing', description: 'Catching fish with a pole') }

    get 'Retrieves a ticket' do
      tags 'Tickets'
      produces 'application/json', 'application/xml'
      parameter name: :user_id, in: :path, type: :string
      parameter name: :skill_id, in: :path, type: :string

      response '200', 'ticket found' do
        schema type: :object,
               properties: {
                 id: { type: :integer },
                 title: { type: :string },
                 description: { type: :text },
                 status: { type: :integer },
                 assignee: { type: :string }
               },
               required: %w[id title status assignee]

        let(:user_id) { user1.id }
        let(:skill_id) { skill.id }
        run_test!
      end

      response '404', 'skill not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end

    # put 'Updates a skill' do
    #   tags 'Skills'
    #   consumes 'application/json'
    #   parameter name: :id, in: :path, type: :string
    #   parameter name: :skill, in: :body, schema: {
    #     type: :object,
    #     properties: {
    #       name: { type: :string },
    #       description: { type: :string }
    #     },
    #     required: [ 'name', 'description' ]
    #   }

    #   response '200', 'blog found' do
    #     schema type: :object,
    #            properties: {
    #              skill: { type: :object },
    #            },
    #            required: ['skill']
    #     let(:id) { skill.id }
    #     let(:name) { 'Juggling' }
    #     run_test! do | response |
    #       data = JSON.parse(response.body)
    #       expect(data['skill']['name']).to eq 'Juggling'
    #     end
    #   end

    #   response '404', 'skill not found' do
    #     let(:id) { 'invalid' }
    #     run_test!
    #   end
    # end

    # delete 'Deletes a skill' do
    #   tags 'Skills'
    #   consumes 'application/json'
    #   parameter name: :id, in: :path, type: :string

    #   response '200', 'blog found' do
    #     let(:id) { skill.id }
    #     run_test!
    #   end

    #   response '404', 'skill not found' do
    #     let(:id) { 'invalid' }
    #     run_test!
    #   end
    # end
  end
end
