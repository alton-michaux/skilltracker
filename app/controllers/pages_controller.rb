class PagesController < ApplicationController
  def home
    render json: { success: 'Welcome to SkillTracker!' }
  end
end
