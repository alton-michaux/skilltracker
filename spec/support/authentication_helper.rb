# frozen_string_literal: true

module AuthenticationHelper
  def generate_jwt_token(user)
    payload = { user_id: user.id }
    JsonWebToken.encode(payload)
  end
end
