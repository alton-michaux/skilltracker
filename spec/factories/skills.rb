# frozen_string_literal: true

FactoryBot.define do
  factory :skill do
    name { 'Ruby on Rails' }

    trait :javascript do
      name { 'Javascript' }
    end

    trait :react do
      name { 'React' }
    end
  end
end
