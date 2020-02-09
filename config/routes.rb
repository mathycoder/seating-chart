Rails.application.routes.draw do
  get '/get_current_user', to: 'sessions#get_current_user'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  
  resources :teachers, only: [:create]
end
