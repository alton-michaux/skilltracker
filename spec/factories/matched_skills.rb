FactoryBot.define do
  factory :matched_skill do
    proficiency { 1 }
    endorsements { 15 }

    association :user, factory: :user
    association :skill, factory: :skill
  end
end
