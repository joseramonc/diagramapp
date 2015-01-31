module NodesHelper

  def shape_class node
    if node.position == 'initial' || node.position == 'final'
      'oval'
    elsif node.type == 'Condition'
      'rombo'
    elsif node.type == 'Activity'
      'rectangle'
    end
  end

end
