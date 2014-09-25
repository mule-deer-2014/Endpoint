class UsersController < ApplicationController
  # POST '/users'
  def create
    @user = User.new(email: params[:email], username: params[:username])
    @user.password = params[:password]
    if @user.save
      render json: {user: @user}.to_json
    else
      errors = []
      @user.errors.messages.each do |property, message|
        errors.concat(message)
      end
      render json: {errors: errors}
    end
  end

  # GET '/users/:id'
  def show
    p user = User.find(params[:id])
    if user
      user_hash = {username: user.username, email: user.email}
      render json: {user: user_hash}.to_json
    else
      render status: :unprocessable_entity, json: { message: "#{params[:id]} is not a valid api id!" }.to_json
    end
  end


  # PUT '/users/:id'
  def update
    user = User.find(params[:id])
      if user.update_attributes(params[:user])
        render json: {user: user}.to_json
      else
        render status: :unprocessable_entity, json: {errors: user.errors}.to_json
      end
  end


  def login
    user = User.where("email = ?", params[:email]).first
    if user && user.password == params[:password]
      render json: {user: user}.to_json
    else
      render json: {message: "user doesn't exist"}.to_json
    end
  end
end