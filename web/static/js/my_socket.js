// web/static/js/my_socket.js

// Phoenix 1.3.0 ではデフォルトで"phoenix"に
// JSのScoketクラスが実装されています。そのSocketクラスをimportします。
//import {Socket} from "phoenix"
import {Socket} from "phoenix"

// チャットを行うクラス
class MySocket {

  // newのときに呼ばれるコンストラクタ
  constructor() {
    console.log("Initialized")

    // 入力フィールド
    this.$username = $("#username")
    this.$message  = $("#message")

    // 表示領域
    this.$messageContainer = $('#messages')

    // キー入力イベントの登録
    this.$message.off("keypress").on("keypress", e => {
      if (e.keyCode === 13) { // 13: Enterキー
        // `${変数}` は式展開
        console.log(`[${this.$username.val()}]${this.$message.val()}`)
        // メッセージの入力フィールドをクリア(空)にする
        this.$message.val("")
      }
    })
  }

  // ソケットに接続
  // トークンを受け取り、トークンがない場合はアラートを表示
  // new Socketで接続するときにトークンをサーバ側に送る
  connectSocket(socket_path, token) {
    if (!token) {
      alert("ソケットにつなぐにはトークンが必要です")
      return false
    }

    // "lib/chat_phoenix/endpoint.ex" に定義してあるソケットパス("/socket")で
    // ソケットに接続すると、UserSocketに接続されます
    this.socket = new Socket(socket_path, { params: { token: token } })
    this.socket.connect()
    this.socket.onClose( e => console.log("Closed connection"))
  }

  // チャネルに接続
  connectChannel(chanel_name) {
    this.channel = this.socket.channel(chanel_name, {})
    this.channel.join()
      .receive("ok", resp => {  // チャネルに入れたときの処理
        console.log("Joined successfully", resp)
        // Username入力フィールドにユーザのemailを自動的にセットする
        this.$username.val(resp.email)
      })
      .receive("error", resp => { // チャネルに入れなかったときの処理
        console.log("Unable to join", resp)
      })

      // キー入力イベントの登録
      this.$message.off("keypress").on("keypress", e => {
        if (e.keyCode === 13) { // 13: Enterキー
          // `${変数}` は式展開
          console.log(`[${this.$username.val()}]${this.$message.val()}`)
          // サーバーに"new:message"というイベント名で、ユーザ名とメッセージを送る
          this.channel.push("new:message", { user: this.$username.val(), body: this.$message.val() })
          // メッセージの入力フィールドをクリア(空)にする
          this.$message.val("")
        }
      })

      // チャネルの"new:message"イベントを受け取ったときのイベント処理
      this.channel.on("new:message", message => this._renderMessage(message) )

  }

  // メッセージを画面に表示
  _renderMessage(message) {
    let user = this._sanitize(message.user || "New User")
    let body = this._sanitize(message.body)

    this.$messageContainer.append(`<p><b>[${user}]</b>: ${body}</p>`)
  }

  // メッセージをサニタイズする
  _sanitize(str) {
    return $("<div/>").text(str).html()
  }

  // メッセージを取得
  all() {
    $.ajax({
      url: "/api/messages"
    }).done((data) => {
      console.log(data)
      // 取得したデータをレンダーする
      data.messages.forEach((message) => this._renderMessage(message))
    }).fall((data) => {
      alert("エラーが発生しました")
      console.log(data)
    })
  }
}

$(
  () => {
    // userTokenがある場合にのみソケットをつなぐ
    // 本来は、app.html.eexでこのJSを読み込まなくする方が良さそう
    // そのためにはJSを分割し、PageControllerのindexアクションで読み込むように
    // render_existingを行う必要がある
    if (window.userToken) {
      let my_socket = new MySocket()
      // app.html.eexでセットしたトークンを使ってソケットに接続
      my_socket.connectSocket("/socket", window.userToken)
      my_socket.connectChannel("rooms:lobby")
      // メッセージを取得
      my_socket.all()
    }
  }
)

export default MySocket
