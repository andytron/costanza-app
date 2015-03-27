Rails.application.routes.draw do

  devise_for :users
  root :to => 'restrooms#index'
  resources :restrooms

end
