# frozen_string_literal: true

class MatchedSkill < ApplicationRecord
  belongs_to :user
  belongs_to :skill
end
