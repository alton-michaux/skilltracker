# frozen_string_literal: true

class TicketSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :status, :assignee, :reporter_avatar

  belongs_to :user
end
