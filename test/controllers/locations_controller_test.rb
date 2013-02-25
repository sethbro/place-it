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

  it "must update location" do
    loc = FactoryGirl.create :location
    new_address = 'statue of liberty'

    put :update, { id: loc.id, location: {address: new_address}, format: :json}

    updated_location = location.merge({address: new_address})
    Location.find(loc.id).address.must_equal new_address
    @response.body.must_equal( updated_location.to_json )
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
