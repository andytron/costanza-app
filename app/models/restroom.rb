class Restroom < ActiveRecord::Base

  has_many :comments
  has_many :favorites
  has_many :ratings

end
