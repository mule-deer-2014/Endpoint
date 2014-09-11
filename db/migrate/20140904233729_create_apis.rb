class CreateApis < ActiveRecord::Migration
  def change
    create_table :apis do |t|
      t.string :title
      t.text :description
      t.string :tips
      t.float :average_score
      t.text :logo_url
      t.string :key_required
      t.string :documentation
      t.string :endpoint_url
      t.string :dev_homepage
      t.text :sample_call
      t.text :sample_response
      t.string :dev_twitter_url
      t.string :category
      t.string :terms_of_service
      t.string :usage_limits
      t.timestamps
    end
  end
end
