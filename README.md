# Seartist
https://img.shields.io/github/languages/code-size/watajam/Seartist

## アプリ概要(Overview)
#### コンセプト
- アーティストやイベント主催者が「出演or主催」するイベントを記入すれば観に行きたい側は検索する事でアーティストやイベントが次にいつ「出演＆開催」が決まっているか即座に調べる事ができる。

#### ターゲット
 -  ターゲット：アーティスト・イベント主催者・イベントを告知したい人・アーティストやイベントの情報を知りたい人 or 応援したい人
  

#### 解決したい課題
- 各SNSで告知をしている人がいるが検索をしてもヒットしにくく見つかりにくい。
- 自分が住んでいる地域などで開催しているイベントやアーティストが検索にすべてヒットしないのでどんなアーティスト活動しているのか見つかりにくい。
- 検索してヒットしても他に様々イベントに関係のない投稿などあるので、その人がどんな活動をしているのか分かりにくい。
- アーティストやイベント主催者の出演＆開催スケジュールを確認したい際に、各SNSのストーリーだと24時間で消えてしまう。投稿しても他の日常的なツイートなどがあり探しづらい。

#### 解決策
- アーティスト＆イベント主催者を詳細に絞って検索できるようにする。(アーティスト名＆ユーザーID＆ジャンル＆所在地＆都道府県＆開催日)
- イベントなどを投稿する際はテンプレートの項目にそって投稿する＝検索しやすくする為。
- テンプレートにそって投稿する為、できる限り余分ツイートは投稿はできないようになる

#### 利用シーン
- リスナー
   - 身近なアーティストやイベントを探したい時
   - 好きなアーティストの最新のイベントを知りたい時
   - 気になったアーティストをフォローすることで、ホーム画面に最新のイベントが分かる
   - 気になったアーティストのSNSなど様々なプロフィールをチェック
   - 気になった投稿をいいねして保存できる

- クリエター
  - 認知度をあげたいアーティストやイベント主催者
  - イベントのスケジュールをファンや利用者に知ってもらいたい方
  - 地域にどんなアーティストやイベントがあるか載せていることで、それを知ったイベント主催者などが関心をよせ仕事を得られる。

#### 利用方法（1例）
- リスナー
  1. アカウントを作成
  2. プロフィール登録
  3. 検索ページから、「アーティスト名＆ユーザーID＆ジャンル＆所在地＆都道府県＆開催日」で検索
  4. 気に入ったアーティストやイベント投稿をフォロー or イイネする事で最新の投稿をチェックできたり、あとから見返すことができる。
  5. 気に入ったアーティストやイベント主催者のプロフィールページからSNSリンクを載せていた場合、各SNSアカウントをチェックできる。

- クリエター
  1. アカウントを作成
  2. プロフィール登録（全ての項目を入力することで検索にヒットしやすい）
  3. 投稿ページにて、イベント告知を各フォームの項目に沿って投稿

#### 各ページ画像（プロフィール・投稿作成・検索・ホーム）
![スクリーンショット_2022-02-02_14](https://user-images.githubusercontent.com/76154856/152098856-28806c12-bdff-455f-b67c-087ec91f8bf2.png)
![スクリーンショット_2022-02-02_14 (1)](https://user-images.githubusercontent.com/76154856/152099037-0dc1d7ab-a254-45b5-a42c-8c2a0f8c2419.png)
![スクリーンショット_2022-02-02_14 (2)](https://user-images.githubusercontent.com/76154856/152099041-5b6ad7f9-17d7-4276-b562-0abf5bd2ee04.png)
![スクリーンショット_2022-02-02_14](https://user-images.githubusercontent.com/76154856/152099042-8725e8d2-22d1-4cef-beaa-d03e1437654b.png)

#### アプリ動作動画  
https://user-images.githubusercontent.com/76154856/152115839-4042a848-9dc8-4536-a86c-f744a7847147.mp4

## アプリリリースURL(demo)
https://seartist.vercel.app/

## テストID / パスワード
- メールアドレス：seartisttest@seartist.com
- パスワード: hmen53F

## 機能一覧(Features)
| ***(Auth関係)***
----
| 新規メールアドレス登録機能
| メールアドレスログイン機能
| Googleログイン機能
| ゲストログイン機能
| パスワード変更機能
| ログアウト機能

| ***(Create)***
-----
| プロフィール登録機能
| 投稿作成

| ***(Read)***
----
| 投稿表示機能

| ***(Update)***
----
| いいね機能
| フォロー&フォロワー機能
| プロフィール編集機能

| ***(Delete)***
----
| 投稿削除機能

| ***(Search)***
----
| 投稿検索機能
| ユーザ検索機能

## 実装予定の機能
- ダークモード

## 使用技術 (Technology)
- React v17.0.2
- Next.js（SSR） v11.1.2
- TypeScript 4.4.3v
- TailwindCSS v3.0.6
- ESLint
- Pritter
- Vercel(ホスティングサービス)
- FireBase(Authentication,Cloud FireStore,Storage)
- headlessui
- Algolia（ユーザの検索機能）
- react-hook-form（フォーム）
- next-seo (SEO＆OGP)
- react-dropzone（画像追加）
- react-icons（アイコン）
- recoi（状態管理）
- react-hot-toast(トースト)
- GitMoji

## 必須環境(Requirements)
- Node.js v14.17.4
- yarn v1.22.17

## ディレクトリ説明
| ページ or ファイル | 説明 |
----|---- 
| pages/creator | クリエターユーザー用の各Formページ |
| pages/listener | リスナーユーザー用の各Formページ |
| pages/explore | 検索画面・検索結果ページ |
| pages/login | ログイン・新規登録・Googleログイン・ゲストログイン・パスワード変更ページ |
| pages/posts | 投稿ページ・投稿詳細・投稿作成ページ |
| pages/profile | プロフィール・プロフィール編集・プライバシーポリシー・利用契約ページ |
| pages/selection.tsx | クリエター or リスナーを選択するページ |
| pages/404.tsx | 404ページ |
| pages/index.tsx | LPページ |
| pages/_app.tsx | SEO&OGP・状態管理・トーストをグローバルで管理 |


| ページ or ファイル | 説明 |
----|---- 
| /lib | FireBaseとAlgolia連携させる為の設定 |
| /styles | Algoliaのスタイルの為 |
| /store | 状態管理ライブラリ（Recoil）を使いログインしているユーザーのメールアドレスを管理 |
| /types | 各ページの型定義 |
| /hooks | Componentsフォルダ内で利用するカスタムフック |
| /FireBase | FireBaseの（Authentication・Mutation・Query）関するカスタムフック |
| /.eslintrc.json | ESLintの設定ファイル |
| /.prettierrc | プリティアの設定ファイル |
| /tailwind.config.js | TailwindCSSの設定ファイル |
| /next-seo.config.ts | SEO&OGPを適応する為の設定ファイル |
| /next.config.js | Next.jsの設定ファイル |

| ページ or ファイル | 説明 |
----|---- 
| components/BottomNavigation | レイアウトに使用するボトムナビゲーション |
| components/Explore | 検索に関するコンポーネント |
| components/FollowsAndFollowers | フォローとフォロワーに関するコンポーネント |
| components/Form| 各Formに関するコンポーネント |
| components/Form/FormList | 各フォームのリスト |
| components/Form/LoginForm | 各ログインのコンポーネント |
| components/Layout | 各ページのレイアウト |
| components/Post | 投稿に関するコンポーネント |
| components/Profile | プロフィールに関するコンポーネント |
| components/SkeletonLoading | 各スケルトンローディングのコンポーネント |
| components/TopPage | LPページのコンポーネント |
| components/Footer.tsx | フッターのコンポーネント |
| components/Selection.tsx | クリエター or リスナーを選択ページのコンポーネント |

## 設計
#### Figma
![スクリーンショット 2022-01-31 23 30 39](https://user-images.githubusercontent.com/76154856/152095030-af7fa533-1a31-49a6-beb4-b93dfeec5a7c.png)

#### 仕様設計
![スクリーンショット 2022-02-02 13 57 10](https://user-images.githubusercontent.com/76154856/152095521-f8ea8331-7930-4d55-b80e-8f110548ed28.png)

![スクリーンショット 2022-02-02 13 57 25](https://user-images.githubusercontent.com/76154856/152095538-e66b4b94-6445-4f32-9694-36992ec24337.png)