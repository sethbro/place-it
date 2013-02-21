require "minitest_helper"

describe Location do
  before do
    @location = Location.new
  end

  it "must be valid" do
    @location.valid?.must_equal true
  end
end
