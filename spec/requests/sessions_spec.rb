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
      let(:user) { create(:user) }
      tags 'sessions'
      consumes 'application/json'

      # This includes a valid auth token header
      # response '200', 'blacklist token' do
      #   run_test! do |response|
      #     data = JSON.parse(response.body)
      #     data['success'].should eq('successfully logged out')
      #   end
      # end
      # # This does not include anything in the header so it fails
      # response '400', 'no token to blacklist' do
      #   run_test!
      # end
    end
  end
end
