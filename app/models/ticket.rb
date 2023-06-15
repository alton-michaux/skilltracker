class Ticket < ApplicationRecord
  enum status: { to_do: 0, in_progress: 1, in_review: 2, complete: 3, blocked: 4 }
end
