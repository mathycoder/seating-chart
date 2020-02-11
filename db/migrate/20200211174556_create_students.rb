class CreateStudents < ActiveRecord::Migration[5.2]
  def change
    create_table :students do |t|
      t.string :first_name
      t.string :last_name
      t.integer :academic_score
      t.integer :behavior_score
      t.integer :klass_id
    end
  end
end
