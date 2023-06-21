# frozen_string_literal: true

# spec/requests/blogs_spec.rb
require 'swagger_helper'

describe 'Jira Issues API' do
  path '/api/v1/jira_issues' do
    get 'Query issue data' do
      tags 'Jira', 'Issues'
      produces 'application/json'

      response '200', 'Return correct information based on query' do
        schema type: :object,
        properties: {

        }, required: []

        run_test!
      end
    end
  end
end
