# frozen_string_literal: true

require 'rails_helper'

RSpec.describe MatchedSkill, type: :model do
  let!(:user) { FactoryBot.create(:user, email: 'fake@test2.com') }
  let!(:skill) { FactoryBot.create(:skill) }
  subject { FactoryBot.create(:matched_skill, user: user, skill: skill) }

  it 'is valid with valid attributes' do
    expect(subject).to be_valid
  end

  it 'is valid without proficiency' do
    subject.proficiency = nil
    expect(subject).to be_valid
  end

  it 'is valid without endorsements' do
    subject.endorsements = nil
    expect(subject).to be_valid
  end

  it 'has an associated user' do
    expect(subject.user).to eq user
  end

  it 'has an associated skill' do
    expect(subject.skill).to eq skill
  end
end
