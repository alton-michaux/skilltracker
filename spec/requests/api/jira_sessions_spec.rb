# frozen_string_literal: true

require 'swagger_helper'
require 'uri'

describe 'Jira Sessions API' do
  let!(:user) { create(:user) }
  # Define a helper method to set the authorization header with a valid token
  let(:auth_headers) do
    token = JsonWebToken.encode(user_id: user.id)
    { 'Authorization' => "Bearer #{token}" }
  end

  # path '/api/v1/jira_sessions/authorize' do
  #   get 'Authorize Jira session' do
  #     tags 'Jira'
  #     produces 'application/json'

  #     response '200', 'Return auth string' do
  #       run_test! do |response|
  #         data = JSON.parse(response.body)
  #         expect(response).to have_http_status(:success)
  #         expect(data['auth']).to_not be_nil
  #       end
  #     end
  #   end
  # end

  # path 'api/v1/jira_sessions/callback' do
  #   get 'Redirect Jira authentication' do
  #     tags 'Jira'
  #     produces 'application/json'

  #     before do
  #       # Simulate a successful authentication by setting the required parameters
  #       # For example, assuming the code parameter is required, you can set it directly
  #       parameters = { code: '8f323rhjeighighhiweh81938r8249' }
  #       allow_any_instance_of(JiraSessionsController).to receive(:session_params).and_return(parameters)
  #     end

  #     response '200', 'Get authorization' do
  #       run_test! do |response|
  #         expect(response).to have_http_status(:success)
  #         # Additional assertions as needed
  #       end
  #     end
  #   end
  # end

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
