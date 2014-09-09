class ReviewsController < ApplicationController
  before_filter :ensure_proper_params, only: [:index]
  # GET /apis/:api_id/reviews
  # GET /users/:user_id/reviews
  def index
    # maybe try like we did for comments_controller, extract method for
    # determining a thing with review e.g. review_bearer
    #
    # this i do not like at all Sam I am.
    #if bad things...do this
    render json: review_bearer.reviews.map{ |rev| ReviewPresenter.new(rev).to_h }
  end

  # POST /apis/:api_id/reviews
  def create
    # a typical pattern would be for Review.new(params[:review])
  	new_review = Review.new(score: params[:score], title: params[:title], content: params[:content], api_id: params[:api_id])
  	if new_review.save
  		render json: {review: new_review}.to_json
  	else
  		render json: {errors: new_review.errors}
  	end
  end

  private

    def ensure_proper_params
      render json: { message: "#{params[:api_id]} or #{params[:user_id]}} is not a valid review/user id!" }.to_json && return
    end
end
