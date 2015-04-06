class RestroomsController < ApplicationController
  before_action :authenticate_user!

  def index
    @restrooms = Restroom.all

    respond_to do |format|
      format.html
      format.json { render :json => @restrooms }
    end
  end

  def create
    # binding.pry
    restroom = Restroom.create(restroom_params)
    render :json => restroom
  end

  def update
    restroom = Restroom.find(params[:id])
    restroom.update(restroom_params)

    render :json => restroom
  end

  def destroy
    restroom = Restroom.find(params[:id])
    restroom.destroy

    render :json => restroom
  end

  private

  def restroom_params
    params.require(:restroom).permit(:place_id)
  end

end
