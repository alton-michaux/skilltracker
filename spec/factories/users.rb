FactoryBot.define do
  factory :user do
    first_name { "Test" }
    last_name  { "User" }
    email { "test@user.com" }
    password { "password" }
  end
end
