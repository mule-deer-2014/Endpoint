class ApisController < ApplicationController
  # POST '/apis'
  def create
    ## might need to changed parameters we are passing in
    new_api = Api.new(params[:api])
    if new_api.save
      render json: {api: new_api}.to_json
    else
      render json: {errors: new_api.errors}
    end
  end


  # GET '/apis/:id'
  def show
    api = Api.find(params[:id])
    if api
      render json: {api: api}.to_json
    else
      render status: :unprocessable_entity, json: { message: "#{params[:api_id]} is not a valid api id!" }.to_json
    end
  end


  # PUT '/apis/:id'
  def update
    api = Api.find(params[:id])
      if api.update_attributes(params[:api])
        render json: {api: api}.to_json
      else
        render status: :unprocessable_entity, json: {errors: api.errors}.to_json
      end
  end

end
