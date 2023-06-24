# frozen_string_literal: true

require 'swagger_helper'

describe 'Jira Sessions API' do
  path '/api/v1/jira_sessions/oauth/authorize' do
    post 'New Jira session' do
      tags 'Jira', 'Sessions'
      
      response '302', 'Redirect for authorization' do
        run_test! do |response|
          follow_redirect!

          expect(response).to have_http_status(:success)
          data = JSON.parse(response.body)
          byebug
        end
      end
    end
  end
end
