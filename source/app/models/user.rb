require 'bcrypt'
class User < ActiveRecord::Base
	include BCrypt
	has_many :reviews
	has_many :votes
	has_many :comments
	has_many :followings
	has_many :apis, through: :followings

  	validates :email, :presence => {:message => "Email cannot be blank"}
  	validates :email, :uniqueness => {:message => "Email already exists"}
  	validates :email, format: { with: /@/, message: "Email format is incorrect"}


	def password
    	@password ||= Password.new(password_hash)
  	end
  	def password=(new_password)
	    @password = Password.create(new_password)
	    self.password_hash = @password
  	end


end