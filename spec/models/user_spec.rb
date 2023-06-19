# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  subject { FactoryBot.create(:user, email: 'gina_thompson@email.com', first_name: 'Gina', last_name: 'Thompson') }

  it 'is valid with email, first and last name' do
    expect(subject).to be_valid
  end

  it 'is not valid without an email' do
    subject.email = nil
    expect(subject).to_not be_valid
  end
  
  it 'is not valid without valid formatted email' do
    subject.email = 'a@com'
    expect(subject).not_to be_valid
  end

  it 'is not valid without a password' do
    subject.password = nil
    expect(subject).not_to be_valid
  end

  it 'is not valid with a password shorter than 6 characters' do
    subject.password = 'passw'
    expect(subject).not_to be_valid
  end

  it 'is not valid without first name' do
    subject.first_name = nil
    expect(subject).to_not be_valid
  end
end
