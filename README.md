# Elixir+PhoenixによるWebアプリの作例(5)

## 概要

- Phoenixによるログイン・ログアウト及びチャット機能の作例です。
- 現時点ではログイン・ログアウト機能のみが実装されています。
- チャット機能については期日実装する予定です。


## 動作環境(バージョン)

- 環境構築の作業手順は[blog](https://github.com/ht0919/blog)を参照して下さい。
  - macOS: 10.13
  - PostgreSQL: 9.6.5
  - Node.js: 8.7.0
  - Elixir: 1.5.2
  - Phoenix: 1.3.0


## 起動方法

- git clone https://github.com/ht0919/phoenix_chat
- cd phoenix_chat
- mix deps.get
- npm install
- mix ecto.create
- mix ecto.migrate
- mix phoenix.server


## 各機能のURL

- ユーザー登録 → [http://localhost:4000/register](http://localhost:4000/register)
- ログイン → [http://localhost:4000/login](http://localhost:4000/login)
