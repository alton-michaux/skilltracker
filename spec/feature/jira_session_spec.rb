require 'rails_helper'
require_relative '../support/webdriver'

RSpec.describe 'Jira session tests', type: :feature, js: true do
  before do
    visit 'oauth/authorize'

    # Use Capybara to follow redirects until reaching the callback URL
    while page.has_text?('Redirecting')
      visit page.response_headers['Location']
    end
  end

  describe 'GET #authorize' do
    it 'fetches Jira authentication url with proper payload' do
      # Extract the code parameter from the callback URL
      auth_url = URI(page.current_url)
      byebug
      client_id = Rack::Utils.parse_query(auth_url.query)['client_id']
      csrf_token = Rack::Utils.parse_query(auth_url.query)['_csrf']

      # Make the callback request with the extracted code
      visit "callback?code=#{code}"

      # Assert the response
      expect(page).to have_http_status(:success)
      # Additional assertions as needed
    end
  end
end

