class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.references :user, index: true
      t.references :restroom, index: true

      t.timestamps null: false
    end
    add_foreign_key :ratings, :users
    add_foreign_key :ratings, :restrooms
  end
end
