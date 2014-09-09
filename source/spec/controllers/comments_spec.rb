require 'rails_helper'
describe CommentsController do
  # DB cleaner
  before :each do
    User.destroy_all
    Comment.destroy_all
    Review.destroy_all
  end
  it "responds successfully with an HTTP 200 status for showing a users' comments" do
    # use let{} here to create these things
    # also, be careful using real email addresses, sometimes your tests mail
    # people and they're not happy about it.
    #
    # @example.com was created for this purpose.
    user = User.create(email: "hi@gmial.com", about_me: "hiiiiii")
    comment = Comment.create(content: "hiiiii")
    user.comments << comment
    get :index, user_id: user.id
    expect(response).to be_success
  end
end
