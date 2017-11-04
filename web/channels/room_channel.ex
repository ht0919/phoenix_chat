# web/channels/room_channel.ex
defmodule ChatPhoenix.RoomChannel do
  use Phoenix.Channel
  alias ChatPhoenix.Repo
  alias ChatPhoenix.User
  alias ChatPhoenix.Message

  # "rooms:lobby"トピックのjoin関数
  def join("rooms:lobby", _message, socket) do
    user = Repo.get(User, socket.assigns[:user_id])
    if user do
      {:ok, %{email: user.email}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # イベント名"new:message"のIncoming eventsを処理する
  def handle_in("new:message", message, socket) do
    # メッセージを作成
    user = Repo.get(User, socket.assigns[:user_id]) |> Repo.preload(:messages)
    #message = Ecto.Model.build(user, :messages, content: message["body"])
    changeset = Message.changeset(%Message{}, %{content: message["body"], user_id: user.id})
    Repo.insert!(changeset)

    # broadcastする値も、作成した値を使用する
    broadcast! socket, "new:message", %{user: user.email, body: message["body"]}
    {:noreply, socket}
  end
end
