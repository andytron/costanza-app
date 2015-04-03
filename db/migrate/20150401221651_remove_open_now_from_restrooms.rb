class RemoveOpenNowFromRestrooms < ActiveRecord::Migration
  def change
    remove_column :restrooms, :open_now, :boolean
  end
end
