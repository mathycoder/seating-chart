class StudentsController < ApplicationController
  def index
    @klass = Klass.find_by(params[:id])
    render json: @klass.students, status: 201
  end

  def create
    @klass = Klass.find_by(params[:id])
    @student = @klass.students.build(student_params)
    if @student.save
      render json: @student, status: 201
    else
      render json: {
        error: @student.errors.full_messages[0]
        }, status: 422
    end
  end

  def destroy
    @student = Student.find_by(id: params[:id])
    @student.destroy
    render json: @student
  end

  private
    def student_params
      params.require(:student).permit(:first_name, :last_name, :behavior_score, :academic_score)
    end
end
