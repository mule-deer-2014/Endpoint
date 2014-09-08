class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|    	
    	t.string :email
    	t.string :password_hash
    	t.string :about_me
    	t.string :picture_url
    	t.timestamps
    end
  end
end
