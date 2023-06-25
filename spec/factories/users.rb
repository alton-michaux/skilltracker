# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    first_name { 'Test' }
    last_name  { 'User' }
    username { 'test_username' }
    email { 'test@user.com' }
    password { 'password' }
  end
end
