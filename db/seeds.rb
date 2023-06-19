# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

user1 = User.find_by(email: 'user@test.com') || User.create(email: 'user@test.com', password: 'password', first_name: 'Jerry', last_name: 'Finch')
user2 = User.find_by(email: 'user2@test.com') || User.create(email: 'user2@test.com', password: 'password', first_name: 'Linda', last_name: 'Ward')

puts "#{User.count} users created"

user_ids = [user1, user2]

skills = []

10.times do |i|
  skills[i] = Skill.create(name: "Number #{i} expert", description: "Expert on the number #{i}")
end

puts "#{Skill.count} skills created"

status = [0, 1, 2, 3, 4]

5.times do |index|
  Ticket.create(title: "Title #{index}", description: "Lorem Ipsum #{index}", status: status.sample, assignee: "Assignee #{index}",
                user: user_ids.sample)
end

puts "#{Ticket.count} tickets created"

10.times do |index|
  MatchedSkill.create(user: user_ids.sample, skill: skills[index], proficiency: rand(5), endorsements: rand(50))
end

puts "#{MatchedSkill.count} matched skills created"
