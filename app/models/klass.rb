class Klass < ApplicationRecord
  belongs_to :teacher
  has_many :students

  def assign_seats(student)
    seat_pair = nil
    seat_group = nil
    counter = 0
    while !seat_pair && !seat_group
      student_in_seat_pair = self.students.find{|st| st.seat_pair == counter}
      student_in_seat_group = self.students.find{|st| st.seat_group == counter}
      seat_pair = counter if !student_in_seat_pair
      seat_group = counter if !student_in_seat_group
      counter += 1
    end
    student.update(seat_pair: seat_pair, seat_group: seat_group)
    self.students
  end

end
