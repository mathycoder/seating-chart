class Klass < ApplicationRecord
  belongs_to :teacher
  has_many :students

  GROUPS = [[0,1,8,9], [2,3,10,11], [4,5,12,13], [6,7,14,15],
            [16,17,24,25], [18,19,26,27], [20,21,28,29], [22,23,30,31]]

  GROUPS_FLAT = GROUPS.flatten

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

  def generate_seats_pairs_hetero
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

  def generate_seats_pairs_homo
    sorted_students = self.students.sort_by{|student| student.academic_score + student.behavior_score}.reverse
    sorted_students.each_with_index do |student, index|
      sorted_students[index].seat_pair = index
      student.update(seat_pair: index)
    end
    sorted_students
  end

  def generate_seats_groups_hetero
  #  my goal is to group by averages
    total_groups = (self.students.length.to_f / 4).ceil
    sorted_students = self.students.sort_by{|student| student.academic_score + student.behavior_score}
    student_data = {}
    sorted_students.each_with_index do |student, index|
      adjusted_index = index % 2 == 0 ? index : sorted_students.length - index
      student_data[student.id] = { group: adjusted_index % total_groups }
    end
    student_data_array = student_data.sort_by{|stId, hash| hash[:group]}
    student_array = student_data_array.map{|arr| Student.find_by(id: arr[0])}
    student_array.each_with_index do |student, index|
      student[:seat_group] = GROUPS_FLAT[index]
      student.update(seat_group: GROUPS_FLAT[index])
    end
    student_array
  end

  def generate_seats_groups_homo
    sorted_students = self.students.sort_by{|student| student.academic_score + student.behavior_score}.reverse
    sorted_students.each_with_index do |student, index|
      sorted_students[index].seat_group = GROUPS_FLAT[index]
      student.update(seat_group: GROUPS_FLAT[index])
    end
    sorted_students
  end

end
