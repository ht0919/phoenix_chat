defmodule ChatPhoenix.UserTest do
  use ChatPhoenix.ModelCase

  alias ChatPhoenix.User

  @valid_attrs %{crypteted_password: "some crypteted_password", email: "some email"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end
end
