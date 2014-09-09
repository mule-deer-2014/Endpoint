class SearchController < ApplicationController
  # get '/'
  def index
  end

  # get '/search'
  def search
    pg_apis = PgSearch.multisearch(params[:input])
  	if !(pg_apis.empty?)
      # AAAAGGGGGGHHHHHHAAAGHHHH
      apis = []
      pg_apis.each do |api|
        apis << Api.find(api.id)
      end
  		render json: {apis: apis}.to_json
  	else
  		render status: :unprocessable_entity, json: { errors: pg_apis.errors }.to_json
  	end
  end

end
