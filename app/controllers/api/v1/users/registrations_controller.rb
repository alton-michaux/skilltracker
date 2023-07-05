# frozen_string_literal: true

module Api
  module V1
    module Users
      class RegistrationsController < Devise::RegistrationsController
        include FormAuth

        before_action :form_auth_token
        before_action :configure_sign_up_params, only: [:create]
        before_action :configure_account_update_params, only: [:update]

        def create
          build_resource(sign_up_params)

          if resource.save
            redirect_to new_api_v1_user_session_path # Redirect to the login page
          else
            render json: { error: "registration unsuccessful" }
          end
        end
        # GET /resource/sign_up

        # POST /resource

        # GET /resource/edit

        # PUT /resource

        # DELETE /resource

        # GET /resource/cancel
        # Forces the session data which is usually expired after sign
        # in to be expired now. This is useful if the user wants to
        # cancel oauth signing in/up in the middle of the process,
        # removing all OAuth session data.

        protected

        def sign_up_params
          params.require(:registration).permit(:email, :password, :password_confirmation, :first_name, :last_name)
        end

        # If you have extra params to permit, append them to the sanitizer.
        def configure_sign_up_params
          devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
        end

        # If you have extra params to permit, append them to the sanitizer.
        def configure_account_update_params
          devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
        end

        # The path used after sign up.

        # The path used after sign up for inactive accounts.
      end
    end
  end
end
