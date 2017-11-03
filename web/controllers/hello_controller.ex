# web/controllers/hello_controller.ex
defmodule ChatPhoenix.HelloController do
  # Webのcontrollerモジュールを使用できるようにする
  use ChatPhoenix.Web, :controller

  # indexアクション
  #  conn - リクエスト情報を保持
  #  params - クエリストリングスやフォーム入力などのパラメータ
  def index(conn, _params) do
    # index.html.eexテンプレートを表示する
    render conn, "index.html"
  end
end
