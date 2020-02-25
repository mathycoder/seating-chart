class Klass < ApplicationRecord
  belongs_to :teacher
  has_many :students

  def new_seats(student, switch_student, new_index, original_index)
    new_array = []
    self.students.each do |student|
      if student.seat == original_index
        student.seat = new_index
        student.update(seat: new_index)
      elsif student.seat == new_index
        student.seat = original_index
        student.update(seat: original_index)
      end
      new_array << student
    end
    new_array
  end

end
