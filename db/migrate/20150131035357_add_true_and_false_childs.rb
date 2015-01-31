class AddTrueAndFalseChilds < ActiveRecord::Migration
  def change
    add_column :nodes, :true_child_id, :integer
    add_column :nodes, :false_child_id, :integer
  end
end
