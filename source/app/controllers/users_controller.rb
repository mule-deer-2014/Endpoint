class UsersController < ApplicationController
  # POST '/users'
  def create
    @user = User.new(email: params[:email])
    @user.password = params[:password]
    if @user.save
      render json: {user: @user}.to_json
    else
      render json: {errors: @user.errors}
    end
  end

  # GET '/users/:id'
  def show
    user = User.find(params[:id])
    if user
      render json: {user: user}.to_json
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
      render json: {authenticate: true}.to_json
    else
      render json: {authenticate: false}.to_json
    end
  end

  def login_user
  end

  def logout
  end

  def github_callback
  end
end