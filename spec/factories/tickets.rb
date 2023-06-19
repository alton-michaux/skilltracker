FactoryBot.define do
  factory :ticket do
    title { 'Implement testing' }
    description { 'Create a basic testing framework for the api. Tests should coverall known endpoints.' }
    status { 1 }
    assignee { 'Test User' }

    trait :ui do
      title { 'Design UI for users dashboard' }
      description { 'We need a new UI for the user dashboard. Take the wireframes from the designer and implement the design.' }
      status { 2 }
      assignee { 'Test User 1' }
      association :user, factory: :user
    end

    trait :data do
      title { 'Sanitize params for FE' }
      description { 'Frontend needs parameters to be sanitized from the controller. Make it happen.' }
      status { 3 }
      assignee { 'Test User 2' }
      association :user, factory: :user
    end

    association :user, factory: :user
  end
end
