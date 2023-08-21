# frozen_string_literal: true

class RemoveMatchedSkills < ActiveRecord::Migration[5.2]
  def up
    drop_table :matched_skills, force: :cascade
  end

  def down
    create_table :matched_skills do |t|
      t.references :user, foreign_key: true, on_delete: :cascade
      t.references :skill, foreign_key: true, on_delete: :cascade

      t.timestamps
    end
  end
end
