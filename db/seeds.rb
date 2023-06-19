# frozen_string_literal: true

require 'faker'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

user1 = User.create(email: Faker::Internet.unique.email, password: Faker::Internet.password, first_name: Faker::Name.first_name,
                    last_name: Faker::Name.unique.last_name)
user2 = User.create(email: Faker::Internet.unique.email, password: Faker::Internet.password, first_name: Faker::Name.first_name,
                    last_name: Faker::Name.unique.last_name)

puts "#{User.count} users created"

users = [user1, user2]

10.times do |_i|
  Skill.create(name: Faker::Job.unique.key_skill, description: Faker::Lorem.sentence(word_count: 3, supplemental: false, random_words_to_add: 4))
end

puts "#{Skill.count} skills created"

status = [0, 1, 2, 3, 4]

5.times do |_index|
  user = users.sample
  Ticket.create(title: Faker::ProgrammingLanguage.unique.name, description: Faker::Lorem.sentence(word_count: 3, supplemental: false, random_words_to_add: 4), status: status.sample, assignee: user.first_name + user.last_name,
                user: user)
end

puts "#{Ticket.count} tickets created"

10.times do |index|
  user = users.sample
  MatchedSkill.create(user: user, skill: Skill.find(index + 1), proficiency: rand(10), endorsements: rand(25))
end

puts "#{MatchedSkill.count} matched skills created"
