class TicketSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :status, :assignee

  belongs_to :user
end
