# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :full_name, :icon

  has_many :tickets
  has_many :skills, through: :user_skills

  def full_name
    "#{object.first_name} #{object.last_name}"
  end

  def skills
    @user_skills = UserSkill.where(user_id: object.id)
  end
end
