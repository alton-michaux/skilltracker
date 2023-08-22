# frozen_string_literal: true

FactoryBot.define do
  factory :user_skill do
    proficiency { 4 }
    endorsements { 15 }

    association :user, factory: :user
    association :skill, factory: :skill
  end
end
