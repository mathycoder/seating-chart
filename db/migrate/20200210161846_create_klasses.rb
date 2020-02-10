class CreateKlasses < ActiveRecord::Migration[5.2]
  def change
    create_table :klasses do |t|
      t.string :name
      t.integer :teacher_id
      t.integer :period
      t.integer :grade
    end
  end
end
