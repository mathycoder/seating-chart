class Teacher < ApplicationRecord
  has_many :klasses
  validates :first_name, presence: true, length: { maximum: 20, minimum: 2 }
  validates :last_name, presence: true, length: { maximum: 20, minimum: 2 }
  validates :email, presence: true, uniqueness: true, length: {minimum: 5 }
  has_secure_password
end
