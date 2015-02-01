class AddInitialDiagramIdToDiagrams < ActiveRecord::Migration
  def change
    add_column :diagrams, :initial_node_id, :integer
  end
end
