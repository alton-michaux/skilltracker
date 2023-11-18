# frozen_string_literal: true

class AddReporterAvatarToTickets < ActiveRecord::Migration[5.2]
  def change
    add_column :tickets, :reporter_avatar, :string
  end
end
