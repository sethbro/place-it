require "minitest_helper"

describe LocationsController do

  let(:location) { FactoryGirl.attributes_for(:location) }

  # ===== API

  it "must get index" do
    loc = FactoryGirl.create :location

    get :index, {format: :json}

    assert_response :success
    @response.body.must_equal [location].to_json
  end

  it "must create location" do
    count = Location.count

    post :create, {location: location, format: :json}

    Location.count.must_equal( count + 1 )
    @response.body.must_equal( location.to_json )
  end

  it "must show location" do
    loc = FactoryGirl.create :location
    get :show, {id: loc.id, format: :json}

    @response.body.must_equal( location.to_json )
  end

  it "must destroy location" do
    loc = FactoryGirl.create :location
    count = Location.count

    delete :destroy, {id: loc.id, format: :json}

    @response.body.must_equal( location.to_json )
    Location.count.must_equal( count - 1)
  end


  # it "must get new" do
  #   get :new
  #   assert_response :success
  # end

  # it "must get edit" do
  #   get :edit, id: @location
  #   assert_response :success
  # end

  # it "must update location" do
  #   put :update, id: @location, location: {  }
  #   assert_redirected_to location_path(assigns(:location))
  # end

end
