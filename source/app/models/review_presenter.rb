class ReviewPresenter
  def initialize(review)
    @review = review
  end

  def to_h
    {
      @review["rev"] = rev
      @review["votes"] = rev.votes
      @review["comments"] = rev.comments
      @reviews << review
    }
  end

  private
end
