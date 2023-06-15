# frozen_string_literal: true

class CreateMatchedSkills < ActiveRecord::Migration[5.2]
  def change
    create_table :matched_skills do |t|
      t.references :user, foreign_key: true
      t.references :skill, foreign_key: true

      t.timestamps
    end
  end
end
