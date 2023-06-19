# frozen_string_literal: true

class Ticket < ApplicationRecord
  belongs_to :user

  enum status: { to_do: 0, in_progress: 1, in_review: 2, complete: 3, blocked: 4 }
end
