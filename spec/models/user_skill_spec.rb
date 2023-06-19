# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserSkill, type: :model do
  let!(:user) { FactoryBot.create(:user, email: 'fake@test.com') }
  let!(:skill) { FactoryBot.create(:skill) }
  subject { FactoryBot.create(:user_skill, user: user, skill: skill) }

  it 'is valid with valid attributes' do
    expect(subject).to be_valid
  end

  it 'has an associated user' do
    expect(subject.user).to eq user
  end

  it 'has an associated skill' do
    expect(subject.skill).to eq skill
  end
end
