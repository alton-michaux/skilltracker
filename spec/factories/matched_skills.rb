FactoryBot.define do
  factory :matched_skill do
    user
    skill
    proficiency { 1 }
    endorsements { 15 }
  end
end