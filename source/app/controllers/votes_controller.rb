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
    # Remove debug stuff...also prefer where(review_id: new_vote.review_id)
    puts "status #{user.votes.where("id = ?", new_vote.id).first}"
    if (user.votes.where("review_id = ?", new_vote.review_id).first).nil? && new_vote.save
      vote_count = review.votes.count
      user.votes << new_vote
      render json: {vote_count: vote_count, review_id: review.id}.to_json
    else
      render :status => 400
    end
  end
end
