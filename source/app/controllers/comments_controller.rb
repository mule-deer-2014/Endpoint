class CommentsController < ApplicationController
  #GET /reviews/:review_id/comments
  #GET /users/:user_id/comments
  def index

    # guard clause here
    # then...
    render json: {comments: determine_commentable.comments}.to_json
    end
  end

  def determine_commentable
    # Feel free to change the implementation of this, but the idea is that the
    # "commentable thing" is determined in a private "helping" method.
    (params[:review_id].empty? ? User.find(params[:user_id]) : Review.find(params[:review_id]))
  end

  private :determine_commentable

  # POST  /reviews/:review_id/comments
  def create
    #assuming params come in in proper format
    comment = Comment.new(params[:comment])
    if comment.save
      review = Review.find(params[:review_id])
      review.comments << comment
    else
      render json: {errors: comment.errors}
    end
  end

end

