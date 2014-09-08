class ReviewsController < ApplicationController
  # GET /apis/:api_id/reviews
  # GET /users/:user_id/reviews
  def index
    if params[:api_id]
    	api = Api.find(params[:api_id])
      comments_array = []
    	reviews = api.reviews
      reviews.each do |rev|
        comments_array << rev.comments
      end
    	render json: {reviews: reviews, comments: comments_array.flatten}.to_json
    elsif params[:user_id]
      	user = User.find(params[:user_id])
      	reviews = user.reviews
      	render json: {reviews: reviews}.to_json
    else
      render json: { message: "#{params[:api_id]} or #{params[:user_id]}} is not a valid review/user id!" }.to_json
    end
  end

  # POST /apis/:api_id/reviews
  def create
  	new_review = Review.new(score: params[:score], title: params[:title], content: params[:content], api_id: params[:api_id])
  	if new_review.save
  		render json: {review: new_review}.to_json
  	else
  		render json: {errors: new_review.errors}
  	end
  end
end
