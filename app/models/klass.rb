class Klass < ApplicationRecord
  belongs_to :teacher
  has_many :students

end
