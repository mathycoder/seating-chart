class StudentsController < ApplicationController
  def index
    @klass = Klass.find_by(id: params[:klass_id])
    render json: @klass.students, status: 201
  end

  def create
    @klass = Klass.find_by(id: params[:klass_id])
    @student = @klass.students.build(student_params)
    @klass.assign_seats(@student)
    if @student.save
      render json: @student, status: 201
    else
      render json: {
        error: @student.errors.full_messages[0]
        }, status: 422
    end
  end

  def update
    klass = Klass.find_by(id: params[:klass_id])
    @student = Student.find_by(id: params[:id])
    @student.update(seat: params[:seat])
    render json: @student, status: 201
  end

  def destroy
    @student = Student.find_by(id: params[:id])
    @student.destroy
    render json: @student
  end

  def swap
    @klass = Klass.find_by(id: params[:klass_id])
    @student_1 = Student.find_by(id: params[:studentId1])
    @student_2 = Student.find_by(id: params[:studentId2])

    if params[:type] == "pair"
      seat_1 = @student_1.seat_pair
      seat_2 = @student_2.seat_pair
      @student_1.update(seat_pair: seat_2)
      @student_2.update(seat_pair: seat_1)
    else
      seat_1 = @student_1.seat_group
      seat_2 = @student_2.seat_group
      @student_1.update(seat_group: seat_2)
      @student_2.update(seat_group: seat_1)
    end
    render json: @klass.students, status: 201
  end

  private
    def student_params
      params.require(:student).permit(:first_name, :last_name, :behavior_score, :academic_score)
    end
end
