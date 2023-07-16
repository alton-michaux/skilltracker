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
            render json: { user: UserSerializer.new(user) }, status: 200
          elsif user
            render json: { error: user.errors.to_a[0] }, status: 401
          else
            render json: { error: 'User not found' }, status: 404
          end
        end

        protected

        def login_params
          if params[:session][:user]
            params.require(:session).require(:user).permit(:email, :password)
          else
            params.require(:session).permit(:email, :password)
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
