# frozen_string_literal: true

module Api
  module V1
    module Users
      class SessionsController < Devise::SessionsController
        include FormAuth

        before_action :form_auth_token, except: [:index]

        def create
          user = User.find_by(email: login_params[:email])

          if user&.valid_password?(login_params[:password])
            # flash.success = "Login successful"
            super
          else
            # flash.alert = "Invalid Email or password."
            render json: { error: 'Login failed' }, status: 401
          end
        end

        def destroy
          super
          flash.success = 'Logged out successfully'
        end

        protected

        def login_params
          params.require(:session).permit(:email, :password)
        end
      end
    end
  end
end
