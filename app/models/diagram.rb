class Diagram < ActiveRecord::Base
  validates_presence_of :name

  has_many :nodes

  def first_node
    nodes.where(position: 0).first
  end

  def last_node
    nodes.where(position: 2).first
  end
end
