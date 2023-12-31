# frozen_string_literal: true

class CreateTickets < ActiveRecord::Migration[5.2]
  def change
    create_table :tickets do |t|
      t.string :title
      t.text :description
      t.integer :status
      t.string :assignee

      t.timestamps
    end
  end
end
