class RemoveCategoryFromRestrooms < ActiveRecord::Migration
  def change
    remove_column :restrooms, :category, :string
  end
end
