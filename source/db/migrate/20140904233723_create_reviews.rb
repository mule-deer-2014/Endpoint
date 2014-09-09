class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
    	t.integer :score
    	t.string :content# no db constraints?  it's ok for this to be nil?
    	t.string :title# no db constraints?  it's ok for this to be nil?
    	t.belongs_to :api
    	t.belongs_to :user
      t.timestamps
    end
  end
end
