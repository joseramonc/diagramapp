class Diagram < ActiveRecord::Base
  validates_presence_of :name

  has_many :nodes, -> {order('position ASC')}

  # Insensible :shipit: :(
  scope :search, -> (q) do
    where('LOWER(name) LIKE LOWER(?)', "%#{q}%")
  end

  def conditions
    Node.where(diagram_id: self.id, type: 'Condition')
  end

  def self.query(q = '')
    if q != ''
      search(q)
    else
      all
    end
  end

  def first_node
    nodes.where(position: 0).first
  end

  def last_node
    nodes.where(position: 2).first
  end

  def each_node_flow_chart
    a = ''
    nodes.each do |node|
      a = a + "#{node.to_flow_chart}<br>"
    end
    return a
  end

  def children_flow
    node_ids = []
    node_ids << first_node.id
    node = first_node
    while node && !node.condition?
      node_ids << node.children.id if (node.children && node.children != first_node)
      node = node.children ? node.children : nil
    end
    return node_ids
  end

  def each_condition_flow_chart
    node_text = ''
    # byebug
    conditions.each do |node|
      node_text = node_text + "#{node.id}(yes)->#{node.true_flow.join('->')}<br>" +
                  "#{node.id}(no)->#{node.false_flow.join('->')}<br>"
    end
    return node_text
  end

  def to_flow_chart
    "st=>start: Start:>http://localhost:3000/<br>".html_safe +
    "e=>end:>http://www.google.com<br>".html_safe +
    each_node_flow_chart.html_safe +
    "st->#{children_flow.join('->')}->e<br>".html_safe +
    each_condition_flow_chart.html_safe
  end
end
