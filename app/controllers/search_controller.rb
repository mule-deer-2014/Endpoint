class SearchController < ApplicationController
  # get '/'
  def index
  end

  # get '/search'
  def search
    pg_apis = PgSearch.multisearch(params[:input])
  	if !(pg_apis.empty?)
      apis = []
      pg_apis.each do |api|
        api_db = Api.find(api.id)
        average_score = api_db.average_score
        api_hash = {id: api_db.id, title: api_db.title, description: api_db.description, 
                    tips: api_db.tips, logo_url: api_db.logo_url, average_score: average_score}
        apis << api_hash
      end

  		render json: {apis: apis}.to_json
  	else
  		render status: :unprocessable_entity, json: { errors: pg_apis.errors }.to_json
  	end
  end

end