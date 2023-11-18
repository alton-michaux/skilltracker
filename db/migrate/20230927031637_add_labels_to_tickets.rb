# frozen_string_literal: true

class AddLabelsToTickets < ActiveRecord::Migration[5.2]
  def change
    add_column :tickets, :labels, :string
  end
end
