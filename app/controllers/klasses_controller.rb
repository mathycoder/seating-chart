class KlassesController < ApplicationController
  def index
    render json: current_user.klasses
  end
end
