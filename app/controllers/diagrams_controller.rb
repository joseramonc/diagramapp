class DiagramsController < AdminController
  before_action :set_diagram, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @diagrams = Diagram.all
    respond_with(@diagrams)
  end

  def show
    respond_with(@diagram)
  end

  def new
    @diagram = Diagram.new
    respond_with(@diagram)
  end

  def edit
  end

  def create
    @diagram = Diagram.new(diagram_params)
    @diagram.save
    respond_with(@diagram)
  end

  def update
    @diagram.update(diagram_params)
    respond_with(@diagram)
  end

  def destroy
    @diagram.destroy
    respond_with(@diagram)
  end

  private
    def set_diagram
      @diagram = Diagram.find(params[:id])
    end

    def diagram_params
      params.require(:diagram).permit(:name)
    end
end
