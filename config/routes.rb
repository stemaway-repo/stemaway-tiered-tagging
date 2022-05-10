# frozen_string_literal: true

Discourse::Application.routes.prepend do
  get '/skills' => 'skills#index'
end
