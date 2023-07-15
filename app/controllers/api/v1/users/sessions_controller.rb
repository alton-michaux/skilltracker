# frozen_string_literal: true

module Api
  module V1
    module Users
      class SessionsController < Devise::SessionsController
        include FormAuth

        before_action :form_auth_token, except: [:index]

        def create
          user = User.find_by(email: login_params[:email])

          if user&.valid? && user&.valid_password?(login_params[:password])
            sign_in(user)
            render json: { success: 'Login successful' }, status: 200
          else
            render json: { error: user&.errors&.to_a[0] }, status: 401
          end
        end

        def destroy
          super
        end

        protected

        def login_params
          if params[:session]
            params.require(:session).permit(:email, :password)
          else
            params.require(:user).permit(:email, :password)
          end
        end

        def require_no_authentication
          return if action_name == 'create'
        
          super
        end
      end
    end
  end
end
