# frozen_string_literal: true

class User < ApplicationRecord
  has_many :tickets
  has_many :matched_skills
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :password, length: { minimum: 6 }, presence: true, confirmation: true, on: :create, if: -> { new_record? || !password.nil? }
  validates :email, presence: true, format: /\b[A-Z0-9._%a-z-]+@(?:[A-Z0-9a-z-]+\.)+[A-Za-z]{2,4}\z/, uniqueness: true
  validates :first_name, presence: true
end
