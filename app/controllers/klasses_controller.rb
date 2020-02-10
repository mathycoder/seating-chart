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

  private
    def klass_params
      params.require(:klass).permit(:name, :period)
    end
end
