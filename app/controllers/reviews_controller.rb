require 'pp'
class ReviewsController < ApplicationController
  # GET /apis/:api_id/reviews
  # GET /users/:user_id/reviews
  def index
    if params[:api_id]
      api = Api.find(params[:api_id])
      reviews = []
      api.reviews.each do |rev|
        review = {}
        review["rev"] = rev
        review["votes"] = rev.votes
        review["comments"] = rev.comments
        review["user"] = rev.user
        reviews << review
      end
      reviews.sort_by!{|rev_obj| rev_obj["votes"].count}
      reviews.reverse!
      render json: {reviews: reviews}.to_json
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
    api = Api.find(params[:api_id])
    review = api.reviews.create(score: params[:score], title: params[:title], content: params[:content])
    render json: {review: review}.to_json
  end
end
