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
        resources :skills, only: %i[index create destroy]
        resources :tickets, only: %i[index create show]
        resources :matched_skills, only: [:index]
      end

      # Add your custom API controller routes here
      # get 'skills', to: 'skills_api#index'
      # post 'skills', to: 'skills_api#create'
      # delete 'skills/:id', to: 'skills_api#delete'
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
