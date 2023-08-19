# frozen_string_literal: true

class UserSkill < ApplicationRecord
  belongs_to :user
  belongs_to :skill

  validates :proficiency, numericality: { only_integer: true }, presence: true
  validates :endorsements, numericality: { only_integer: true }, presence: true

  validates_associated :user
  validates_associated :skill
end
