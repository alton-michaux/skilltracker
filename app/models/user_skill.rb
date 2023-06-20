# frozen_string_literal: true

class UserSkill < ApplicationRecord
  belongs_to :user
  belongs_to :skill

  validates_associated :user
  validates_associated :skill
end
