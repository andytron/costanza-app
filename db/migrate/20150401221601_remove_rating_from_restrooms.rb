class RemoveRatingFromRestrooms < ActiveRecord::Migration
  def change
    remove_column :restrooms, :rating, :integer
  end
end
