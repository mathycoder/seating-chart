class StudentsController < ApplicationController
  def index
    @klass = Klass.find_by(params[:id])
    render json: @klass.students, status: 201
  end
end
