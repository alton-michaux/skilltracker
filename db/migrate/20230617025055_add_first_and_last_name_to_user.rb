# frozen_string_literal: true

class AddFirstAndLastNameToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
  end
end
