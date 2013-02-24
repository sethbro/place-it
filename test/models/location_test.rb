require "minitest_helper"

describe Location do

  before do
    @location = FactoryGirl.create :location
  end

  it "must be valid" do
    @location.valid?.must_equal true
  end

end
