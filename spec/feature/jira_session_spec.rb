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

  describe 'GET #callback' do
    it 'redirects Jira authentication and creates a Jira client' do
      byebug
      # Extract the code parameter from the callback URL
      callback_url = URI.parse(page.current_url)
      code = Rack::Utils.parse_query(callback_url.query)['code']

      # Make the callback request with the extracted code
      visit "callback?code=#{code}"

      # Assert the response
      expect(page).to have_http_status(:success)
      # Additional assertions as needed
    end
  end
end

