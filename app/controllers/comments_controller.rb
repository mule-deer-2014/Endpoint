class CommentsController < ApplicationController
  #GET /reviews/:review_id/comments
  #GET /users/:user_id/comments
  def index
    comments = determine_commentable_type.comments
    render json: {comments: comments}.to_json
  end

  # POST  /reviews/:review_id/comments
  def create
    comment = Comment.new(params[:comment])
    if comment.save
      review = Review.find(params[:review_id])
      review.comments << comment
    else
      render json: {errors: comment.errors}
    end
  end

  private

    def determine_commentable_type
      (params[:review_id].nil? ? User.find(params[:user_id]) : Review.find(params[:review_id]))
    end
end


