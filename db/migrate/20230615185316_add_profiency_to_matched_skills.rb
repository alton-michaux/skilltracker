class AddProfiencyToMatchedSkills < ActiveRecord::Migration[5.2]
  def change
    add_column :matched_skills, :proficiency, :integer
    add_column :matched_skills, :endorsements, :integer
  end
end
