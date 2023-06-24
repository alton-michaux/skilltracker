# frozen_string_literal: true

require 'swagger_helper'
require 'uri'

describe 'Jira Sessions API' do
  path '/api/v1/jira_sessions/oauth/authorize' do
    post 'New Jira session' do
      tags 'Jira', 'Sessions'
      consumes 'application/json'

      response '302', 'Redirect for authorization' do
        run_test! do |response|
          expect(response).to have_http_status(:redirect)
          redirect_url = URI(response.headers['Location'])
          expected_base_url = URI('http://localhost:3000/oauth/authorize')

          expect(redirect_url.host).to eq(expected_base_url.host)
          expect(redirect_url.path).to eq(expected_base_url.path)
        end
      end
    end
  end

  path '/api/v1/jira_sessions/oauth/authorize' do
    post 'Authorize Jira session' do
      tags 'Jira', 'Sessions'

      response '302', 'Redirect for authorization' do
        run_test! do |response|
          follow_redirect!

          expect(response).to have_http_status(:found)
          redirect_url = URI(response.headers['Location'])
          expected_base_url = URI('http://localhost:3000/oauth/authorize')

          expect(redirect_url.host).to eq(expected_base_url.host)
          expect(redirect_url.path).to eq(expected_base_url.path)
        end
      end
    end
  end

  # path '/api/v1/jira_sessions/{id}' do
  #   delete 'Destroy Jira session' do
  #     tags 'Jira', 'Sessions'
  #     consumes 'application/json'
  #     parameter name: :id, in: :path, type: :string, required: true

  #     response '204', 'No Content' do
  #       let(:jira_session) { instance_double(Api::V1::JiraSessionsController, id: 12) }

  #       before do
  #         allow(Api::V1::JiraSessionsController).to receive(:new).and_return(jira_session)
  #         allow(jira_session).to receive(:dispatch)
  #         allow(jira_session).to receive(:destroy)
  #       end

  #       run_test! do |response|
  #         let!(:id) { 1 }
  #         byebug
  #         expect(response).to have_http_status(:no_content)
  #       end
  #     end
  #   end
  # end
end
