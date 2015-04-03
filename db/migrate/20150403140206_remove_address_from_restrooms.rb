class RemoveAddressFromRestrooms < ActiveRecord::Migration
  def change
    remove_column :restrooms, :address, :string
  end
end
