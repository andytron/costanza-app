class CreateRestrooms < ActiveRecord::Migration
  def change
    create_table :restrooms do |t|
      t.string :name
      t.string :address
      t.string :category
      t.string :coordinates
      t.integer :rating
      t.string :google_id
      t.boolean :open_now

      t.timestamps null: false
    end
  end
end
