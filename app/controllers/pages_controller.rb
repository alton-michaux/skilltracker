# frozen_string_literal: true

class PagesController < ApplicationController
  def home
    # Render your main React component for the React application
    render component: 'App'
  end

  def login
    # Render your React component for the login page
    render component: 'Login'
  end
end
