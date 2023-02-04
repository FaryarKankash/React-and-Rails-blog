Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # *user routes
  post "/user", to: "users#create"
  get "/user/:id", to: "users#readUser"
  get "/user", to: "users#readAllUser"
  put "/user", to: "users#updateUser"
  # *auth routes
  post "/auth", to: "auth#signIn"
  post "/me", to: "auth#me"
  # *post routes
  post "/post", to: "posts#create"
  get "/post", to: "posts#index"
  get "/post/user", to: "posts#indexUser"
  get "/post/:id", to: "posts#show"
  delete "/post/:id", to: "posts#delete"
  put "/post/:id", to: "posts#update"
end
