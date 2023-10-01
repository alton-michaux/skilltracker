class RemoveMatchedSkillIdFromUserSkills < ActiveRecord::Migration[5.2]
  def up
    remove_column :user_skills, :matched_skill_id, :integer
  end

  def down
    add_column :user_skills, :matched_skill_id, :integer
  end
end
