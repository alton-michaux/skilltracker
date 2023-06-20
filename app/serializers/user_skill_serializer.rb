# frozen_string_literal: true

class UserSkillSerializer < ActiveModel::Serializer
  attributes :id, :user, :skill

  belongs_to :user
  belongs_to :skill
end
