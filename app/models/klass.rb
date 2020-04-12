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

  def generate_seats_pairs_hetero(group_by)
    sorted = sorted_students(group_by)
    seated_students = []
    while sorted.length > 0
      seated_students << sorted.pop
      seated_students << sorted.shift if sorted.length != 0
    end
    seated_students = shuffled_pairs(seated_students)

    seated_students.each_with_index do |student, index|
      seated_students[index].seat_pair = index
      student.update(seat_pair: index)
    end
    seated_students
  end

  def generate_seats_pairs_homo(group_by)
    sorted = sorted_students(group_by)
    sorted = shuffled_pairs(sorted)
    sorted.each_with_index do |student, index|
      sorted[index].seat_pair = index
      student.update(seat_pair: index)
    end
    sorted
  end

  def generate_seats_groups_hetero(size, group_by)
  #  my goal is to group by averages
    total_groups = (self.students.length.to_f / size.to_f).ceil
    student_data = {}
    sorted_students(group_by).each_with_index do |student, index|
      adjusted_index = index % 2 == 0 ? index / 2 : self.students.length - (index+1)/2
      student_data[student.id] = { group: adjusted_index % total_groups, student: student }
    end
    student_data_array = student_data.sort_by{|stId, hash| hash[:group]}

    groups = {0 => 0, 1=> 0, 2=> 0, 3=> 0, 4=> 0, 5=> 0, 6=> 0, 7=> 0, 8=> 0 }
    student_data_array.each_with_index do |arr, index|
      group = arr[1][:group]
      student_data_array[index][1][:seat] = groups[group]
      groups[group] += 1
    end

    groups = random_groups(size)

    student_data_array.each_with_index do |array, index|
      group_index = array[1][:group]
      seat = array[1][:seat]
      array[1][:student].update(seat_group: GROUPS[groups[group_index]][seat])
    end
    self.students
  end

  def generate_seats_groups_homo(size, group_by)
    groups = random_groups(size)
    group_index = 0
    seat = 0
    sorted_students(group_by).each do |student|
      if seat >= size.to_i
        seat = 0
        group_index += 1
      end
      student.update(seat_group: GROUPS[groups[group_index]][seat])
      seat += 1
    end
    self.students
  end
end

def random_groups(size)
  num_of_groups = (self.students.length / size.to_f).ceil
  (0..(num_of_groups - 1)).to_a.shuffle
end

def sorted_students(group_by)
  if group_by == 'Academics'
    sorted = self.students.sort_by{|student| student.academic_score }
  elsif group_by == "Behavior"
    sorted = sorted = self.students.sort_by{|student| student.behavior_score}
  else
    sorted = self.students.sort_by{|student| student.academic_score + student.behavior_score}
  end
  sorted
end

def shuffled_pairs(sorted)
  pairs_array = paired_array(sorted)
  final_array = []
  shuffled_pair_indicies = (0..(sorted.length / 2).ceil - 1).to_a.shuffle
  shuffled_pair_indicies.each do |index|
    final_array.push(pairs_array[index])
  end
  final_array.flatten
end

def paired_array(sorted)
  pair_array = []
  pair = []
  sorted.each_with_index do |student, index|
    pair.push(student)
    if index % 2 == 1 || index == sorted.length - 1
      pair_array.push(pair)
      pair = []
    end
  end
  pair_array = [[]] if sorted.length == 0
  pair_array
end
