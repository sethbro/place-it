# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do

  factory :location do
    id 1
    name "Home"
    address "1600 W Pennsylvania, Washington D.C."
    latitude 41.9
    longitude -87.67
  end

end
