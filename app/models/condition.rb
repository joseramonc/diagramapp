class Condition < Node
  validates_presence_of :true_child_id
  validates_presence_of :false_child_id

  def true_child
    Node.find(true_child_id)
  end

  def children
    true_child
  end

  def false_child
    Node.find(false_child_id)
  end

  def next_true_child
    if !true_child.rendered?
      true_child.render
    else
      ''
    end
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
end
