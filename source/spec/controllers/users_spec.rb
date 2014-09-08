require 'rails_helper'
describe UsersController do
    before :each do
      User.destroy_all
    end
    it "successfully creates a new user" do
      expect {
        post :create, email: "hi@gmail.com", password: "hiiiiii", about_me: "i'm a person"
      }.to change { User.count }
    end

    it "responds successfully with an HTTP 200 status code for showing a user" do
      user = User.create(email: "hi@gmail.com", password: "hiiiiii", about_me: "i'm a person")
      get :show, id: user.id
      expect(response).to be_success
    end

    it "successfully updates a user" do
      user = User.create(email: "hi@gmail.com", password: "hiiiiii", about_me: "i'm a person")
      expect {
        user.update_attributes(email: 'meep')
      }.to change {user.email}
    end
end