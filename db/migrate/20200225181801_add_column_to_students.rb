class AddColumnToStudents < ActiveRecord::Migration[5.2]
  def change
    add_column :students, :seat, :integer
  end
end
