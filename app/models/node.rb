class Node < ActiveRecord::Base
  attr_accessor :rendered

  def initialize(options = {})
    rendered = false
    super(options)
  end

  def rendered?
    rendered
  end

  enum position: [
    :initial,
    :middle,
    :final
  ]

  validates_presence_of :diagram_id

  belongs_to :diagram

  has_one :children,
          class_name:  'Node',
          foreign_key: 'parent_id'

  belongs_to  :parent,
              class_name: 'Node',
              foreign_key: 'id'

  before_destroy :update_childs


  def condition?
    type == 'Condition'
  end

  def last?
    position != 2
  end

  def render
    rendered = true
    "#{text}<br>#{children.text if children}".html_safe
  end

  def has_children?
    last?
  end

  private

  def update_childs

  end

end
