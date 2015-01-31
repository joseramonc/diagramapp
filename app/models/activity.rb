class Activity < Node
  def flow_type
    'operation'
  end

  def to_flow_chart
    "#{self.id}=>#{self.flow_type}: #{self.text}"
  end
end
