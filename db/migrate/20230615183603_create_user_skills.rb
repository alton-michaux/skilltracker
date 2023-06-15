class CreateUserSkills < ActiveRecord::Migration[5.2]
  def change
    create_table :user_skills do |t|
      t.references :user, null: false
      t.references :skill, null: false

      t.timestamps
    end
  end
end
