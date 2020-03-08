class StudentsController < ApplicationController
  def index
    @klass = Klass.find_by(id: params[:klass_id])
    render json: @klass.students, status: 201
  end

  def create
    @klass = Klass.find_by(id: params[:klass_id])
    @student = @klass.students.build(student_params)
    @student.seat = @klass.students.length - 1
    if @student.save
      render json: @student, status: 201
    else
      render json: {
        error: @student.errors.full_messages[0]
        }, status: 422
    end
  end

  def update
    @klass = Klass.find_by(id: params[:klass_id])
    student = Student.find_by(id: params[:id])
    #@student.update(seat: params[:newIndex])
    switch_student = Student.find_by(seat: params[:newIndex])
    #switch_student.update(seat: params[:originalIndex])
    render json: @klass.new_seats(student, switch_student, params[:newIndex], params[:originalIndex]), status: 201
  end

  def destroy
    @student = Student.find_by(id: params[:id])
    @student.destroy
    render json: @student
  end

  def swap
    @student_1 = Student.find_by(id: params[:studentId1])
    seat_1 = @student_1.seat
    @student_2 = Student.find_by(id: params[:studentId2])
    seat_2 = @student_2.seat
    @student_1.update(seat: seat_2)
    @student_2.update(seat: seat_1)
  end

  private
    def student_params
      params.require(:student).permit(:first_name, :last_name, :behavior_score, :academic_score)
    end
end
