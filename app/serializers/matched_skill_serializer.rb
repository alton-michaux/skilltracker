# frozen_string_literal: true

class MatchedSkillSerializer < ActiveModel::Serializer
  attributes :id, :proficiency, :endorsements

  belongs_to :user
  belongs_to :skill
end
