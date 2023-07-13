# frozen_string_literal: true

module Api
  module V1
    module Users
      class SessionsController < Devise::SessionsController
        include FormAuth

        before_action :form_auth_token, except: [:index]
        before_action :configure_sign_in_params, only: [:create, :new]

        def new
         super
        end        

        def create
          # self.resource = warden.authenticate!(auth_options)
          # if resource
          #   sign_in(resource_name, resource)
          #   render json: { success: true }
          # else
          #   render json: { error: warden.message || 'Authentication failed' }, status: :unauthorized
          # end
        end

        # GET /resource/sign_in

        # POST /resource/sign_in

        # DELETE /resource/sign_out

        protected

        def login_params
          params.require(:session).permit(:email, :password)
        end

        # If you have extra params to permit, append them to the sanitizer.
        def configure_sign_in_params
          devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
        end
      end
    end
  end
end
