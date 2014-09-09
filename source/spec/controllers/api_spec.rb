require 'rails_helper'
describe ApisController do
  # 1) Indentation is ratchet
  # 2) Use Database cleaner to clean up after test runs
  # 3) Use let{} to create testable instances
  # 4) Use FactoryGirl to create the instance e.g.
  #
  # let(:api){ FactoryGirl.create(:api, description: "hi")

		before :each do
    	Api.destroy_all
 		end
    it "successfully creates a new api" do
      expect {
        post :create, title: "hi", description: "hi", tips: "hi"
      }.to change { Api.count }
    end
    it "responds successfully with an HTTP 200 status code for showing an api" do
      get :show, id: api.id
      expect(response).to be_success
    end
    it "successfully updates an api" do
    	api = Api.create(title: "hi", description: "hi", tips: "hi")
    	expect {
    		api.update_attributes(title: 'meep')
    	}.to change {api.title}
    end
end
