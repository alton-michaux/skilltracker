# frozen_string_literal: true

class User < ApplicationRecord
  has_many :tickets
  has_many :matched_skills
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
