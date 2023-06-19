# frozen_string_literal: true

# spec/requests/blogs_spec.rb
require 'swagger_helper'

describe 'Tickets API' do
  let!(:user) { create(:user, email: 'user@testemail.com') }
  let!(:skill) { create(:skill, name: 'API', description: 'Build, maintain and troubleshoot internal API systems') }
  let!(:ticket) { create(:ticket, user: user )}

  path '/api/v1/users/{user_id}/tickets' do
    get 'Query ticket data' do
      tags 'Tickets'
      produces 'application/json'
      parameter name: :user_id, in: :path, type: :string, required: true

      response '200', 'Return correct information based on query' do
        schema type: :array,
        items: {
          type: :object,
          properties: {
            id: { type: :integer },
            title: { type: :string },
            description: { type: :text },
            status: { type: :string },
            assignee: { type: :string }
          }, required: %w[ id title description status assignee ]
        }

        let(:user_id) { user.id }
          
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data[0]["id"]).to eq ticket.id
          expect(data[0]["title"]).to eq ticket.title
          expect(data[0]["description"]).to eq ticket.description
          expect(data[0]["user"]["id"]).to eq user_id
        end
      end

      response '404', 'Not found' do
        let(:user_id) { user.id }
        let(:ticket) { nil }

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
      parameter name: :ticket_id, in: :path, type: :string

      response '200', 'Query for specific ticket' do
        schema type: :object,
               properties: {
                 id: { type: :integer },
                 title: { type: :string },
                 description: { type: :text },
                 status: { type: :integer },
                 assignee: { type: :string },
                 user_id: { type: :integer }
               },
               required: %w[id title status assignee user_id]

        let(:user_id) { user.id }
        let(:ticket_id) { ticket.id }
        run_test!
      end

      response '404', 'Not found' do
        let(:user_id) { nil }
        run_test!
      end
    end
  end
end
