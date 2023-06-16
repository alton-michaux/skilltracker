class UserSerializer < ActiveModel::Serializer
  attributes :id, :email

  has_many :tickets
  has_many :matched_skills
end
