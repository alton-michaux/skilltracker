# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Ticket, type: :model do
  let!(:user) { create(:user) }
  subject { FactoryBot.create(:ticket, :data, user: user) }

  it 'is valid with valid attributes' do
    expect(subject).to be_valid
  end

  it 'is valid with an associated user' do
    expect(subject.user).to eq user
  end

  it 'is not valid without a title' do
    subject.title = nil
    expect(subject).not_to be_valid
  end

  it 'is valid without a description' do
    subject.description = nil
    expect(subject).to be_valid
  end
end
