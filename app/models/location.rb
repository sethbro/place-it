class Location < ActiveRecord::Base
  attr_accessible :address, :latitude, :longitude, :name

  validates :address, :latitude, :longitude, presence: true
  validates :address, uniqueness: true

end
