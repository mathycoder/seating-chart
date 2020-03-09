class Klass < ApplicationRecord
  belongs_to :teacher
  has_many :students

  def assign_seats(student)
    seat_pair = nil
    seat_group = nil
    counter = 0
    while !seat_pair || !seat_group
      if !seat_pair
        student_in_seat_pair = self.students.find{|st| st.seat_pair == counter}
        seat_pair = counter if !student_in_seat_pair
      end
      if !seat_group
        student_in_seat_group = self.students.find{|st| st.seat_group == counter}
        seat_group = counter if !student_in_seat_group
      end
      counter += 1
    end
    student.update(seat_pair: seat_pair, seat_group: seat_group)
    self.students
  end

  def generate_seats_pairs
    sorted_students = self.students.sort_by{|student| student.academic_score + student.behavior_score}.reverse
    seated_students = []
    while sorted_students.length > 0
      seated_students << sorted_students.pop
      seated_students << sorted_students.shift if sorted_students.length != 0
    end
    seated_students.each_with_index do |student, index|
      seated_students[index].seat_pair = index
      student.update(seat_pair: index)
    end
    seated_students
  end

end
