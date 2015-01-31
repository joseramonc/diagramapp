class Condition < Node
  validates_presence_of :true_child_id, if: :'persisted?'
  validates_presence_of :false_child_id, if: :'persisted?'

  def true_child
    Node.find(true_child_id) if true_child_id
  end

  def children
    true_child
  end

  def false_child
    Node.find(false_child_id) if false_child_id
  end

  def next_true_child
    if !true_child.rendered?
      true_child.render
    else
      ''
    end
  end

  def true_flow
    rendered_nodes = []
    rendered_nodes << self.id
    node = true_child
    while node && !rendered_nodes.include?(node.id)
      rendered_nodes << node.id
      if node.condition? || node.children.nil?
        if node.final?
          rendered_nodes << 'e'
        end
        node = nil
      else
        node = node.children
      end
    end
    # byebug
    rendered_nodes = (rendered_nodes - [self.id])
    return rendered_nodes
  end

  def false_flow
    rendered_nodes = []
    rendered_nodes << self.id
    node = false_child
    while node && !rendered_nodes.include?(node.id)
      rendered_nodes << node.id
      if node.condition? || node.children.nil?
        if node.final?
          rendered_nodes << 'e'
        end
        node = nil
      else
        node = node.children
      end
    end
    rendered_nodes = (rendered_nodes - [self.id])
    return rendered_nodes
  end

  def next_false_child
    if !false_child.rendered?
      false_child.render
    else
      ''
    end
  end

  def render
    rendered = true
    "#{text} ?
      <li>#{next_true_child}</li>
    else
      <li>#{next_false_child}</li>".html_safe
  end

  def flow_type
    'condition'
  end

  def to_flow_chart
    "#{self.id}=>condition: #{self.text}"
  end

end
