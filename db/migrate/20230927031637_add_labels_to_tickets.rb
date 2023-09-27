class AddLabelsToTickets < ActiveRecord::Migration[5.2]
  def change
    add_column :tickets, :labels, :string
  end
end
