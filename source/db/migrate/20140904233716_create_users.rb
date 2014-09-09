class CreateUsers < ActiveRecord::Migration
  def change
    # Be careful of trailing whitespace
    create_table :users do |t|    	
    	t.string :email # no db constraints?  it's ok for this to be nil?
    	t.string :password_hash
    	t.string :about_me
    	t.string :picture_url
    	t.timestamps
    end
  end
end
