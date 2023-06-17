# frozen_string_literal: true

class ApplicationController < ActionController::Base
  attr_accessor :get_current_user

  private

  def user_params
    params.permit(:user_id)
  end
  
  def get_current_user
    @current_user = User.find(user_params['user_id'])
  end
end
