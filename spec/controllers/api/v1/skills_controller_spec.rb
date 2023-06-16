# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SkillsController, type: :controller do
  def index do
    byebug
    @skills = current_user.skills
  end
end
