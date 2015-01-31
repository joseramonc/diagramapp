class NodesController < AdminController
  before_action :set_node, only: [:show, :show_mobile,:edit, :update, :destroy]
  before_action :current_class_symbol, only: [:update]
  before_action :set_form, only: [:new, :create, :edit, :update]

  before_action :authenticate_user!, except: [:next]

  respond_to :html

  def index
    @nodes = Node.all
    respond_with(@nodes)
  end

  # GET /nodes/:id/next?condition=(true|false)
  def next
    @node = Node.find(params[:id])
    if params[:condition] == '1'
      response = @node.true_child
    elsif params[:condition] == '0'
      response = @node.false_child
    end
    response = @node.children

    render json: JSON.parse(response.to_json).merge(type: response.type)
  end

  # GET /nodes/:id/next?condition
  # def previous
  # end

  def show
    @nodes_of_diagram = Node.where(diagram: @node.diagram)
    respond_with(@node)
  end

  def show_mobile
  end

  def new
    @node = Node.new
    respond_with(@node)
  end

  def edit
  end

  def condition
    @node = Condition.find(params[:id])
    @node.update_attribute(:true_child_id, params[:condition][:true_child_id])
    @node.update_attribute(:false_child_id, params[:condition][:false_child_id])
    redirect_to node_path(@node)
  end

  def create
    @node = Node.new(node_params)
    @node.save
    redirect_to node_path(@node)
  end

  def update
    @node.update(node_params)
    redirect_to node_path(@node)
  end

  def destroy
    @node.destroy
    redirect_to nodes_path
  end

  private
    def set_node
      @node = Node.find(params[:id])
    end

    def node_params
      params.require(:node).permit(
        :text,
        :position,
        :diagram_id,
        :help_text,
        :parent_id,
        :type,
        :true_child_id,
        :false_child_id
      )
    end

    def current_class_symbol
      if params.has_key?('condition')
        params['node'] = params.delete('condition')
      elsif params.has_key?('activity')
        params['node'] = params.delete('activity')
      elsif params.has_key?('loop')
        params['node'] = params.delete('loop')
      end
    end

    def set_form
      @diagrams = Diagram.all
    end
end
