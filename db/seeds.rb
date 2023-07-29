# frozen_string_literal: true

require 'faker'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

user1 = User.create(email: "admin@gmail.com", password: "password", first_name: "Tremont", last_name: "Williams")

puts "#{User.count} users created"

10.times do
  Skill.create(name: Faker::Job.unique.key_skill, description: Faker::Lorem.sentence(word_count: 3, supplemental: false, random_words_to_add: 4))
end

puts "#{Skill.count} skills created"

status = [0, 1, 2, 3, 4]

5.times do |_index|
  Ticket.create(title: Faker::ProgrammingLanguage.unique.name, description: Faker::Lorem.sentence(word_count: 3, supplemental: false, random_words_to_add: 4), status: status.sample, assignee: user1.first_name + user1.last_name,
                user: user1)
end

puts "#{Ticket.count} tickets created"

5.times do |index|
  UserSkill.create(user: user1, skill: Skill.find(index + 1))
end

puts "#{UserSkill.count} user skills created"

# 3.times do |index|
#   MatchedSkill.create(user: user1, skill: Skill.find(index + 1), proficiency: rand(10), endorsements: rand(25))
# end

# puts "#{MatchedSkill.count} matched skills created"
