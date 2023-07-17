# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :full_name

  has_many :tickets
  has_many :matched_skills

  def full_name
    "#{object.first_name} #{object.last_name}"
  end
end
