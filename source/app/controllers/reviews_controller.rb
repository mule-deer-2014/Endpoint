class ReviewsController < ApplicationController
  # GET /apis/:api_id/reviews
  # GET /users/:user_id/reviews

  def index
    type = reviewable_type

    if type.class == User
      render json: {reviews: reviewable_type.reviews}
    elsif type.class == Api
      formatted_data = ReviewPresenter.new(reviewable_type.reviews).change_to_hash
      render json: {reviews: formatted_data}.to_json
    else
      render json: { message: "#{params[:api_id]} or #{params[:user_id]}} is not a valid review/user id!" }.to_json
    end
  end

  # POST /apis/:api_id/reviews
  def create
  	new_review = Review.new(params)
  	if new_review.save
  		render json: {review: new_review}.to_json
  	else
  		render json: {errors: new_review.errors}
  	end
  end

  private

  def reviewable_type
    (params[:api_id].nil? ? User.find(params[:user_id]) : Api.find(params[:api_id]))
  end

end
