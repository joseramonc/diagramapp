class CreateNodes < ActiveRecord::Migration
  def change
    create_table :nodes do |t|
      t.string :text
      t.integer :position
      t.integer :diagram_id
      t.string :help_text
      t.integer :parent_id

      t.timestamps
    end
  end
end
