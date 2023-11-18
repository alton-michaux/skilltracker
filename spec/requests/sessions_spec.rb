# frozen_string_literal: true

require 'swagger_helper'

describe 'sessions API' do
  let!(:user1) { FactoryBot.create(:user) }
  # Define a helper method to set the authorization header with a valid token
  let(:auth_headers) do
    token = JsonWebToken.encode(user_id: user1.id)
    { 'Authorization' => "Bearer #{token}" }
  end
  # Creates swagger for documentaion for login
  path '/api/v1/login' do
    post 'Creates a session' do
      tags 'sessions'
      consumes 'application/json'
      parameter name: :user, in: :body, required: true, schema: {
        type: :object,
        properties: {
          user: {
            properties: {
              email: { type: :string },
              password: { type: :string }
            }
          }
        },
        required: %w[email password]
      }

      let!(:user) do
        {
          user: {
            email: user1.email,
            password: user1.password
          }
        }
      end

      response '200', 'session created' do
        run_test!
      end

      response '401', 'Unauthorized' do
        let(:user) do
          {
            user: {
              email: user1.email,
              password: ''
            }
          }
        end
        run_test!
      end

      response '404', 'Not found' do
        let(:user) do
          {
            user: {
              email: 'test_user2@email.com',
              password: 'password12'
            }
          }
        end
        run_test!
      end
    end
  end

  # Swagger documentation for logout.
  path '/api/v1/logout' do
    delete 'Destroy session' do
      tags 'sessions'
      consumes 'application/json'
      security [Bearer: {}]

      response '204', 'blacklist token' do
        let(:token) { generate_jwt_token(user) }
        let(:Authorization) { "Bearer #{token[0]}" }
        # Set the authorization header with a valid token for the logout request
        let(:Authorization) { auth_headers['Authorization'] }

        run_test!
      end
    end
  end
end
