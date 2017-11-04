# web/views/message_view.ex
defmodule ChatPhoenix.MessageView do
  use ChatPhoenix.Web, :view

  def render("index.json", %{messages: messages}) do
    # messagesの各messageを下記のmessage.jsonで表示する
    %{messages: render_many(messages, ChatPhoenix.MessageView, "message.json")}
  end

  def render("message.json", %{message: message}) do
    # messagesのid, content, messageのuserのemailをJSON形式で表示する
    %{id: message.id, body: message.content, user: message.user.email}
  end

end
