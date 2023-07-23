# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::JiraSessionsController, type: :controller do
  describe 'Jira Sessions API' do
    describe 'POST #authorize' do
      it 'returns an auth string' do
        get 'authorize'

        # Assert the response
        expect(response).to have_http_status(:success)
      end
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
