# frozen_string_literal: true
require 'swagger_helper'

describe 'sessions API' do
  let!(:user1) { FactoryBot.create(:user) }
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

      # Use an it block to define the behavior of the logout action
      it 'destroys the session and logs out the user' do
        # Login the user to simulate authentication
        login_as(user1, scope: :user)
        
        # Make the request to the logout endpoint
        delete '/api/v1/logout'
        
        # Add your expectations here based on the logout response
        expect(response).to have_http_status(:ok)
      end
      # This does not include anything in the header so it fails
      response '400', 'no token to blacklist' do
        run_test!
      end
    end
  end
end
