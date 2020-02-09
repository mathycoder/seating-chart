class TeachersController < ApplicationController

  def create
    @teacher = Teacher.new(teacher_params)
    @teacher.password = params[:password]
    if @teacher.save
      session[:user_id] = @teacher.id
      render json: {
        user: {
          firstName: @teacher.first_name,
          lastName: @teacher.last_name,
          email: @teacher.email,
          id: @teacher.id
          }
        }, status: 201
    else
      render json: {
        error: @teacher.errors.full_messages.first
        }, status: 424
    end
  end

  private
    def teacher_params
      params.require(:teacher).permit(:password, :first_name, :last_name, :email)
    end

end
