# app/controllers/concerns/form_auth.rb
module FormAuth
  extend ActiveSupport::Concern

  included do
    include ActionController::Cookies
    include ActionController::RequestForgeryProtection
    include ActionController::Instrumentation

    protect_from_forgery with: :exception
  end

  def form_auth_token
    # Step 1: Retrieve the CSRF token from the server
    csrf_token = form_authenticity_token

    # Step 2: Include the CSRF token in your API response headers
    response.headers['X-CSRF-Token'] = csrf_token

    # Process the API request and generate the response
    # ...

    # Example usage of logger
    logger.info('API request processed successfully')
  end
end
