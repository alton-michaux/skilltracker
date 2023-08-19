class RemoveDescriptionFromSkills < ActiveRecord::Migration[5.2]
  def up 
    remove_column :skills, :description, :string
  end
  
  def down 
    add_column :skils, :description, :string
  end
end
