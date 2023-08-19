class AddProficiencyAndEndorsementsToUserSkills < ActiveRecord::Migration[5.2]
  def change
    add_column :user_skills, :proficiency, :integer
    add_column :user_skills, :endorsements, :integer
  end
end
