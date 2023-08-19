# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Skill, type: :model do
  subject { FactoryBot.create(:skill, :javascript) }

  it 'is valid with valid attributes' do
    expect(subject).to be_valid
  end

  it 'is not valid without a name' do
    subject.name = nil
    expect(subject).not_to be_valid
  end
end
