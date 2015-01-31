class PagesController < ApplicationController

  def index
    params[:search] = '' if params[:search].nil?
    @diagrams = Diagram.query(params[:search])
  end

  def diagram
    @diagram = Diagram.find(params[:id])
  end
end
