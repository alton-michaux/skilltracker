# frozen_string_literal: true

FactoryBot.define do
  factory :skill do
    name { 'Ruby on Rails' }
    description  { 'Fullstack framework' }

    trait :javascript do
      name { 'Javascript' }
      description { 'Language of the internet' }
    end

    trait :react do
      name { 'React' }
      description { 'Frontend framework' }
    end
  end
end
