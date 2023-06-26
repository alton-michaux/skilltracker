# frozen_string_literal: true

# app/controllers/concerns/form_auth.rb
module FormAuth
  extend ActiveSupport::Concern

  included do
    include ActionController::Cookies
    include ActionController::RequestForgeryProtection
    include ActionController::Instrumentation

    protect_from_forgery with: :null_session
  end

  def form_auth_token
    csrf_token = form_authenticity_token
    response.headers['X-CSRF-Token'] = csrf_token
  end
end
