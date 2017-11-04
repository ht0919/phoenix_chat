defmodule ChatPhoenix.Message do
  use ChatPhoenix.Web, :model

  schema "messages" do
    field :content, :string
    belongs_to :user, ChatPhoenix.User, foreign_key: :user_id

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:content])
    |> validate_required([:content])
  end
end
