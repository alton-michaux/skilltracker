# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::JiraSessionsController, type: :controller do
  include Devise::Test::ControllerHelpers
  describe 'Jira Sessions API' do
    let!(:user) { create(:user) }

    let(:auth_headers) do
      token = JsonWebToken.encode(user_id: user.id)
      { 'Authorization' => "Bearer #{token}" }
    end

    it 'returns an auth string' do
      sign_in user

      request.headers.merge!(auth_headers)

      get 'authorize'

      expect(response).to have_http_status(:success)
      body = JSON.parse(response.body)
      expect(body['auth']).not_to be_nil
    end

    # describe 'GET #callback' do
    #   before do
    #     # Simulate a successful authentication by setting the required parameters
    #     @params = { authorization_code: '8f323rhjeighighhiweh81938r8249' }
    #     # allow_any_instance_of(JiraSessionsController).to receive(:session_params).and_return(@params)
    #   end

    #   it 'redirects Jira authentication and creates a Jira client' do
    #     # Make the callback request with the extracted code
    #     get 'callback', params: { authorization_code: @params['authorization_code'] }

    #     # Assert the response
    #     expect(response).to have_http_status(:success)
    #     # Additional assertions as needed
    #   end
    # end
  end
end
