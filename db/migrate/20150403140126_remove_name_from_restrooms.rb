class RemoveNameFromRestrooms < ActiveRecord::Migration
  def change
    remove_column :restrooms, :name, :string
  end
end
