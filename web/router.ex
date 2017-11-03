defmodule ChatPhoenix.Router do
  use ChatPhoenix.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", ChatPhoenix do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    #
    get "/hello", HelloController, :index
    # 登録画面表示(new)と登録処理(create)
    get  "/register", RegistrationController, :new
    post "/register", RegistrationController, :create
  end

  # Other scopes may use custom stacks.
  # scope "/api", ChatPhoenix do
  #   pipe_through :api
  # end
end
