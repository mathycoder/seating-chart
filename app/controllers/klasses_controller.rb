class KlassesController < ApplicationController
  def index
    render json: current_user.klasses
  end

  def create
    @klass = current_user.klasses.build(klass_params)
    if @klass.save
      render json: @klass, status: 201
    else
      render json: {
        error: @klass.errors.full_messages[0]
        }, status: 422
    end
  end

  def update
    @klass = Klass.find_by(id: params[:id])
    if @klass.update(klass_params)
      render json: @klass, status: 201
    else
      render json: {
        error: @klass.errors.full_messages[0]
        }, status: 422
    end
  end

  def destroy
    @klass = Klass.find_by(id: params[:id])
    @klass.destroy
    render json: @klass
  end

  private
    def klass_params
      params.require(:klass).permit(:name, :period)
    end
end
