class RemoveCoordinatesFromRestrooms < ActiveRecord::Migration
  def change
    remove_column :restrooms, :coordinates, :string
  end
end
