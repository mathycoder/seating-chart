Rails.application.routes.draw do
  get '*path', to: "static_pages#index", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

  get '/get_current_user', to: 'sessions#get_current_user'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  post '/klasses/:klass_id/students/swap', to: 'students#swap'
  get '/klasses/:klass_id/students/dynamic_pairs_hetero', to: 'students#dynamic_pairs_hetero'

  resources :teachers, only: [:create]
  resources :klasses, only: [:index, :create, :update, :destroy]

  resources :klasses do
    resources :students, only: [:index, :create, :update, :destroy]
  end
end
