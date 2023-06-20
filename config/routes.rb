# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  namespace :api do
    namespace :v1 do
      # Devise routes for authentication
      devise_for :users, path: '', path_names: {
        sign_in: 'login',
        sign_out: 'logout',
        registration: 'signup'
      }, controllers: {
        sessions: 'api/v1/users/sessions',
        registrations: 'api/v1/users/registrations'
      }

      resources :users, only: %i[index show] do
        resources :tickets, only: %i[index show]
        resources :matched_skills, only: [:index]
        resources :user_skills, only: [:index]
      end

      # Add your custom API controller routes here
      get 'skills', to: 'skills#index'
      post 'skills', to: 'skills#create'
      delete 'skills/:id', to: 'skills#delete'
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
