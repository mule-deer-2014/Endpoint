require 'json'
require 'csv'
return_arrays = []
CSV.foreach("database.csv") do |row|
   return_arrays << row.to_a
end

return_arrays.each do |array|
  array.each do |string|
    unless string.nil?
      string.gsub!("^", ",")
    end
  end
end

api_attributes = return_arrays.transpose
api_attributes.each do |api|
  title = api[0]
  description = api[1]
  key_required = api[2]
  endpoint_url = api[3]
  dev_homepage = api[4]
  category = api[5]
  logo_url = api[6]
  Api.create(
    title: title,
    description: description,
    key_required: key_required,
    endpoint_url: endpoint_url,
    dev_homepage: dev_homepage,
    category: category,
    logo_url: logo_url,
    )
end

# //////////////////////////////////////////////////////////////////////
# ////////////////////// FAKE SEED DATA ////////////////////////////////
# //////////////////////////////////////////////////////////////////////

20.times {
  user = User.new(email: Faker::Internet.email,
          about_me: Faker::Lorem.sentence(3),
          picture_url: 'http://www.chadcreates.com/wp-content/uploads/2009/05/People-128.png'
          )
  user.password = Faker::Internet.password
  user.save
}

5000.times {
  review = Review.create(
    score: rand(1..5),
    content: Faker::Lorem.sentence(3),
    title: Faker::Lorem.word)

  api = Api.find(rand(1..Api.all.count))
  user = User.find(rand(1..20))
  api.reviews << review
  user.reviews << review
}

1000.times {
  vote = Vote.create()
  user = User.find(rand(1..20))
  review = Review.find(rand(1..5000))
  user.votes << vote
  review.votes << vote
}

100.times {
  comment = Comment.create(content: Faker::Lorem.sentence(3))
  user = User.find(rand(1..20))
  review = Review.find(rand(1..50))
  user.comments << comment
  review.comments << comment
}
