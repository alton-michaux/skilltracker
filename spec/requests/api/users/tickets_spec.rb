# frozen_string_literal: true

# spec/requests/blogs_spec.rb
require 'swagger_helper'

describe 'Tickets API' do
  let!(:user) { create(:user, email: 'user@testemail.com') }
  let!(:user2) { create(:user, email: 'user2@testemail.com') }
  let!(:skill) { create(:skill, name: 'API', description: 'Build, maintain and troubleshoot internal API systems') }
  let!(:ticket) { create(:ticket, user: user )}
  let!(:ticket2) { create(:ticket, :data, user: user )}

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
          expect(data[1]["title"]).to eq ticket2.title
          expect(data[0]["description"]).to eq ticket.description
          expect(data[1]["user"]["id"]).to eq user_id
        end
      end

      response '404', 'Not found' do
        let(:user_id) { user2.id }

        run_test!
      end
    end
  end

  path '/api/v1/users/{user_id}/tickets/{id}' do
    get 'Retrieves a ticket' do
      tags 'Tickets'
      produces 'application/json', 'application/xml'
      parameter name: :user_id, in: :path, type: :string, required: true
      parameter name: :id, in: :path, type: :string, required: true

      response '200', 'Query for specific ticket' do
        schema type: :object,
               properties: {
                 title: { type: :string },
                 description: { type: :text },
                 status: { type: :integer },
                 assignee: { type: :string }
               }

        let(:user_id) { user.id }
        let(:id) { ticket2.id }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data["ticket"]["title"]).to eq ticket2.title
          expect(data["ticket"]["status"]).to eq ticket2.status
          expect(data["ticket"]["user"]["id"]).to eq user_id
        end
      end

      response '404', 'Not found' do
        let(:user_id) { user2.id }
        let(:id) { 45 }

        run_test!
      end
    end
  end
end
