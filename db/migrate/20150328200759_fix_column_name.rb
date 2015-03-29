class FixColumnName < ActiveRecord::Migration
  def change
    rename_column :restrooms, :google_id, :place_id
  end
end
