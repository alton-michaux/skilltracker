module Api
  module V1
    class SkillsApiController < ActionController::Metal
      include ActionController::Cookies
      include ActionController::RequestForgeryProtection
      include ActionController::Instrumentation

      protect_from_forgery with: :exception

      def create
        # Step 1: Retrieve the CSRF token from the server
        csrf_token = form_authenticity_token

        # Step 2: Include the CSRF token in your API response headers
        response.headers["X-CSRF-Token"] = csrf_token

        # Process the API request and generate the response
        # ...

        # Example usage of logger
        logger.info("API request processed successfully")

        @skill = Skill.new(user_id: @current_user.id)
        if @skill.save
          render json: { skill: SkillSerializer.new(@skill) }, status: 201
        else
          render json: @skill.errors.full_messages, status: 422
        end
      rescue ActiveRecord::NotNullViolation => e
        render json: { error: e.message }, status: 422
      end
      
      def delete
        # Step 1: Retrieve the CSRF token from the server
        csrf_token = form_authenticity_token

        # Step 2: Include the CSRF token in your API response headers
        response.headers["X-CSRF-Token"] = csrf_token

        # Process the API request and generate the response
        # ...

        # Example usage of logger
        logger.info("API request processed successfully")
        
        if @skill.destroy
          render json: { success: "Skill destroyed" }, status: 200
        else
          render json: @skills.errors.full_messages, status: 422
        end
      end
    end
  end
end
