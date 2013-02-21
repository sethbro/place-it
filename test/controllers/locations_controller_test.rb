require "minitest_helper"

describe LocationsController do

  before do
    @location = locations(:one)
  end

  it "must get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:locations)
  end

  it "must get new" do
    get :new
    assert_response :success
  end

  it "must create location" do
    assert_difference('Location.count') do
      post :create, location: {  }
    end

    assert_redirected_to location_path(assigns(:location))
  end

  it "must show location" do
    get :show, id: @location
    assert_response :success
  end

  it "must get edit" do
    get :edit, id: @location
    assert_response :success
  end

  it "must update location" do
    put :update, id: @location, location: {  }
    assert_redirected_to location_path(assigns(:location))
  end

  it "must destroy location" do
    assert_difference('Location.count', -1) do
      delete :destroy, id: @location
    end

    assert_redirected_to locations_path
  end

end
