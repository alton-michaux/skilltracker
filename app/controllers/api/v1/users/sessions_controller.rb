# frozen_string_literal: true

module Api
  module V1
    module Users
      class SessionsController < Devise::SessionsController
        include FormAuth

        before_action :form_auth_token, except: [:index]
        before_action :authorize_request, except: [:create]
        
        def create
          @user = User.find_by_email(login_params[:email])

          if @user&.valid_password?(login_params[:password])
            sign_in(@user)
            token = JsonWebToken.encode(user_id: @user.id)
            time = Time.now + 24.hours.to_i
            render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"),
                          user: UserSerializer.new(@user) }, status: :ok
          else
            render json: { error: 'unauthorized' }, status: :unauthorized
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
