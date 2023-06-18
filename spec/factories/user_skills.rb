FactoryBot.define do
  factory :user_skill do
    association :user, factory: :user
    association :skill, factory: :skill
  end
end