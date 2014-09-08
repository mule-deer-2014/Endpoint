class VotesController < ApplicationController
  # GET /reviews/:review_id/votes(.:format)
  def index
    votes = Review.find(params[:review_id]).votes
    render json: {votes: votes}
  end

  # POST /reviews/:review_id/votes(.:format)
  def create

    review = Review.find(params[:review_id])
    new_vote = review.votes.new()
    user = User.find(params[:user_id])
    # user = User.find(params[:user_id])
    #send userid

    if new_vote.save
      vote_count = review.votes.count
      user.votes << new_vote
      render json: {vote_count: vote_count}.to_json
    else
      render json: {errors: vote.errors}.to_json
    end
  end
end
