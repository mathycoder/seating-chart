class SessionsController < ApplicationController
  skip_before_action :require_login, only: [:create, :get_current_user]

  def create
    @teacher = Teacher.find_by(email: params[:session][:email])
    if @teacher && @teacher.authenticate(params[:session][:password])
      session[:user_id] = @teacher.id
      render json: {
        user: {
          firstName: @teacher.first_name,
          lastName: @teacher.last_name,
          email: @teacher.email,
          id: @teacher.id
        }}, status: 201
    else
      render json: {
        error: "Invalid Credentials", status: 422
      }
    end
  end

  def get_current_user
    if current_user
      render json: {
        user: {
          firstName: current_user.first_name,
          lastName: current_user.last_name,
          email: current_user.email,
          id: current_user.id
        }}, status: 201
    else
      render json: {
        error: "No one logged in"
      }
    end
  end

  def destroy
    session.clear
    render json: {
      notice: "successfully logged out"
    }
  end

  private
    def session_params
      params.require(:session).permit(:email, :password, :username)
    end
end
