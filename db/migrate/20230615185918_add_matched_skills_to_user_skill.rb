# frozen_string_literal: true

class AddMatchedSkillsToUserSkill < ActiveRecord::Migration[5.2]
  def change
    add_reference :user_skills, :matched_skill, foreign_key: true
  end
end
