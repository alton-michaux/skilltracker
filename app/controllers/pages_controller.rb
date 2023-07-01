# frozen_string_literal: true

class PagesController < ApplicationController
  def home
    render json: { success: 'Welcome to SkillTracker!' }
  end
end
