Rails.application.routes.draw do
  resources :teachers, only: [:create]
end
