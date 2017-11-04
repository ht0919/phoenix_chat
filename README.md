# Elixir+PhoenixによるWebアプリの作例(5)

## 概要

- Phoenixによるログイン・ログアウト及びチャット機能の作例です。
- 基本的に『[Phoenix入門1 - Hello Phoenix](http://ruby-rails.hatenadiary.com/entry/20151011/1444560106)』の手順に従って作成しました。作者の方に感謝です。


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


## 実行時のイメージ

![img01.png](https://raw.githubusercontent.com/ht0919/phoenix_chat/master/images/img01.png)


## 各機能のURL

- ユーザー登録 → [http://localhost:4000/register](http://localhost:4000/register)
- ログイン → [http://localhost:4000/login](http://localhost:4000/login)
