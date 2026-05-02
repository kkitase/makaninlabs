# Makanin Labs

AI × Marketing の講演・カスタムワークショップを提供するコーポレートサイト。

🌐 **本番**: https://makaninlabs.com

---

## 概要

このリポジトリは Makanin Labs のサイト本体です。1 ページ構成のミニマルな LP で、お問い合わせは Google フォーム経由。

- **Hero** — メインメッセージ + 「講演・ワークショップを依頼する」CTA
- **Topics** — 3 つの専門領域（AI 導入の組織変革 / コンテンツ制作 / ツール・プロンプト実践）
- **Workshop** — 依頼形態（講演・登壇 / カスタムワークショップ 2h〜1day）
- **Contact** — Google フォーム連携（隠し iframe POST）
- **Footer**

## 技術スタック

| | |
|---|---|
| UI | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS (CDN) |
| Hosting | Firebase Hosting |
| Form | Google Forms |

## 前提

- **Node.js** v18 以上

## ローカル開発

```bash
npm install
npm run dev
```

開発サーバは Vite 設定により **HTTPS / port 5173** で起動します（自己署名証明書）。
ブラウザで `https://localhost:5173/` を開き、証明書警告を許可してください。

## ビルド・コマンド

| コマンド | 用途 |
|---|---|
| `npm run dev` | 開発サーバ起動（HTTPS / port 5173） |
| `npm run build` | プロダクションビルド（`dist/` に出力） |
| `npm run preview` | ビルド結果のローカルプレビュー |

## プロジェクト構成

```
makaninlabs/
├── App.tsx                  # ルート（scroll 検知 + レイアウト）
├── components/
│   ├── Header.tsx           # ロゴ + 「ご相談」CTA
│   ├── Hero.tsx             # メインメッセージ
│   ├── Topics.tsx           # 3 専門領域
│   ├── Workshop.tsx         # 依頼形態
│   ├── ContactSection.tsx   # Google フォーム連携
│   └── Footer.tsx
├── index.html               # title / description / フォント読み込み
├── index.css                # アニメーション・スクロールバー等のグローバル CSS
├── index.tsx                # React マウント
├── vite.config.ts
├── firebase.json            # Hosting 設定（public: dist, SPA rewrites）
├── .firebaserc              # 紐付くプロジェクト: makaninlabs-web
└── docs/superpowers/        # 設計書 / 実装計画（参考）
```

---

# アーキテクチャ

サーバーサイドのレンダリングや API は持たない、純粋な **静的 SPA 配信** 構成。動的処理が必要な「お問い合わせ送信」だけを Google Forms に外出ししている。

## 全体図

```
┌──────────┐
│ ブラウザ │ https://makaninlabs.com
└────┬─────┘
     │
     │ ① DNS 解決（→ 詳細は「ドメイン・DNS 構成」セクション）
     ▼
┌──────────────────────────────────────┐
│ Firebase Hosting Ingress              │
│ (199.36.158.100 / Fastly CDN 経由)    │
└────┬─────────────────────────────────┘
     │ ② SNI で makaninlabs.com を判別
     │    TXT レコードから makaninlabs-web プロジェクトと特定
     ▼
┌──────────────────────────────────────┐
│ Firebase Hosting (makaninlabs-web)    │
│  - dist/ の静的ファイルを配信          │
│  - SPA rewrites: 全パスを index.html に│
│  - 自動 HTTPS（Let's Encrypt 互換）    │
└────┬─────────────────────────────────┘
     │ ③ 静的アセットを返す
     │    index.html / index-{hash}.js / index-{hash}.css
     ▼
┌──────────┐
│ ブラウザ │ React アプリ起動
└────┬─────┘
     │
     │ ④ 外部リソースの読み込み（CDN 直接、Firebase は介在しない）
     │
     ├──► Google Fonts（Inter / Noto / Sawarabi Mincho）
     ├──► Tailwind CSS（cdn.tailwindcss.com）
     │
     │ ⑤ お問い合わせフォーム送信
     ▼
┌──────────────────────────────────────┐
│ Google Forms                          │
│ docs.google.com/forms/.../formResponse│
│  - 隠し iframe を target にして POST   │
│  - 結果は紐付けスプレッドシートに記録  │
└──────────────────────────────────────┘
```

## レイヤー別の役割

### ビルド時（CI / 開発者の手元）

```
src(.tsx, .css, index.html)
   ↓ vite build
dist/
   ├── index.html         # title / 静的タグ + バンドル参照
   ├── assets/index-{hash}.js   # React + 全コンポーネントを 1 ファイルに
   └── assets/index-{hash}.css  # index.css 由来のグローバル CSS
   ↓ firebase deploy --only hosting
Firebase Hosting CDN（即時反映）
```

- バンドラ：**Vite 6**（esbuild + Rollup）
- ハッシュ付きファイル名により **CDN キャッシュは恒久的に強気で効かせられる**（`assets/*` は 1 年キャッシュ、`index.html` は短期キャッシュという Firebase デフォルト）

### 配信時（ランタイム）

| 層 | 役割 | 備考 |
|---|---|---|
| DNS | Squarespace Domains が管理 | 権威 NS は Google Cloud DNS |
| Edge | Firebase Hosting Ingress（Fastly 経由） | 199.36.158.100、東京リージョン含む全世界エッジ |
| TLS | Firebase が自動発行・更新 | Google Trust Services 発行、3 ヶ月ごと自動ローテーション |
| Origin | Firebase Hosting Storage | `dist/` のスナップショット、各リリースで世代管理 |
| クライアント | React 19 SPA | 状態管理は `useState`（Hero の scroll 検知のみ） |

### 外部依存（実行時にブラウザが直接ロード）

- **Tailwind CSS**：`cdn.tailwindcss.com` から JIT 生成（プロダクション化する場合はローカルビルドに切替を検討）
- **Google Fonts**：`fonts.googleapis.com` / `fonts.gstatic.com`
- **お問い合わせ送信**：`docs.google.com/forms/...` に隠し iframe で POST

外部依存はすべて Google / Tailwind 公式の信頼できる CDN なので、CSP 観点でもシンプルに保てている。

## 設計上の特徴とトレードオフ

| 選択 | 利点 | 妥協点 |
|---|---|---|
| **静的 SPA + 外部フォーム** | サーバ管理不要、認証もなし、Firebase Hosting の月額 0 円枠で運用可能 | フォーム送信成功の確実な検知ができない（iframe 仕様）、自前のフォーム集計はできない |
| **Tailwind CDN（JIT）** | ローカルビルド設定が不要、書いたクラスが即反映 | 本番でも CDN ロード分の RTT が増える、CSP で `script-src` 制限を強くしにくい |
| **React SPA（CSR のみ）** | 開発体験がシンプル、Vite の HMR が高速 | SSR / SSG なしのため初回 LCP は CDN キャッシュ任せ、SEO は title / description / OGP で対応 |
| **Firebase Hosting** | デプロイ 1 コマンド、無料枠が広い、自動 HTTPS | バックエンドが必要になった時は Cloud Functions / Cloud Run の追加が必要 |
| **Google Forms** | 実装ゼロで送信受付が動く、スプレッドシート連動 | 細かい UX 制御不可、reCAPTCHA 等の自前対策不可 |

## 将来拡張時に検討すべき変更

`docs/superpowers/specs/2026-05-02-training-pivot-design.md` の「将来課題」セクションも併せて参照。

- **Insights / Slides セクションの追加**：Markdown ベースで `content/` ディレクトリから読み込み、必要なら React Router 導入
- **Tailwind のローカル化**：本番のロード時間と CSP を厳格化したい場合、CDN → ローカルビルドに切替
- **OGP 画像の動的生成**：Cloud Functions for Firebase + Satori などでサーバレス OGP
- **お問い合わせの自前化**：Google Forms から Cloud Run / Cloud Functions + Firestore への移行（reCAPTCHA・通知連携が必要になったら）

---

# デプロイ（Firebase Hosting）

## Firebase プロジェクト

| 項目 | 値 |
|---|---|
| Project ID | `makaninlabs-web` |
| 所有アカウント | `kkitase@makaninlabs.com` |
| Hosting Site | `makaninlabs-web` |
| デフォルト URL | `https://makaninlabs-web.web.app` |
| カスタムドメイン | `makaninlabs.com` / `www.makaninlabs.com` |

## デプロイ手順

```bash
# 1. Firebase CLI（未インストールなら）
npm install -g firebase-tools

# 2. ログイン（kkitase@makaninlabs.com）
firebase login

# アカウント切り替えが必要な場合
firebase login:list
firebase login:use kkitase@makaninlabs.com

# 3. プロジェクトを makaninlabs-web に固定（既に .firebaserc で設定済み）
firebase use makaninlabs-web

# 4. ビルド
npm run build

# 5. デプロイ
firebase deploy --only hosting
```

デプロイ完了後、`makaninlabs-web.web.app` および `makaninlabs.com` / `www.makaninlabs.com` で配信されます。

---

# ドメイン・DNS 構成

このセクションは「**ブラウザに `makaninlabs.com` を打ち込んでから Firebase Hosting がコンテンツを返すまで**」の経路を、運用に必要な範囲でまとめたものです。

## 構成図

```
ブラウザ
  │
  │ "makaninlabs.com" を打ち込む
  ▼
DNS リゾルバ（ISP / Google 8.8.8.8 等）
  │
  │ "makaninlabs.com の IP は？"
  ▼
権威 DNS（Squarespace Domains が管理）
  │  ↓
  │  権威 NS: ns-cloud-b{1-4}.googledomains.com
  │  （ドメイン購入時に Squarespace が割り当てた Google Cloud DNS）
  │  ↓
  │  A レコード: 199.36.158.100   ← Firebase Hosting Ingress
  │  TXT レコード: hosting-site=makaninlabs-web ← どの Firebase プロジェクトに渡すかの目印
  ▼
ブラウザは 199.36.158.100 へ HTTPS 接続（SNI で makaninlabs.com を提示）
  │
  ▼
Firebase Hosting Ingress
  │
  │ 受信したホスト名 + TXT レコードの hosting-site 値で
  │ どのサイトを返すかを判定
  ▼
makaninlabs-web プロジェクトの dist/ コンテンツを配信
```

## DNS レコード（Squarespace Domains に登録されている内容）

ドメイン `makaninlabs.com` は Squarespace Domains で管理しています。
管理画面：https://account.squarespace.com → Domains → makaninlabs.com → DNS → DNS Settings

### カスタム レコード（Firebase Hosting 用）

| Type | 名前 | 値 | 用途 |
|---|---|---|---|
| A | `@` | `199.36.158.100` | apex を Firebase Hosting Ingress に向ける |
| TXT | `@` | `hosting-site=makaninlabs-web` | apex が `makaninlabs-web` プロジェクトに属することを示す |
| CNAME | `www` | `makaninlabs-web.web.app` | `www` を Firebase Hosting に向ける |

### Google レコード（メール用 / 触らない）

Google Workspace のメールが makaninlabs.com で動いているため、以下のレコードがあります。**Hosting と独立** しているので変更不要：

| Type | 名前 | 優先度 | 値 |
|---|---|---|---|
| MX | `@` | 10 | `aspmx.l.google.com` |
| MX | `@` | 10 | `alt1.aspmx.l.google.com` |
| MX | `@` | 10 | `alt2.aspmx.l.google.com` |
| MX | `@` | 10 | `alt3.aspmx.l.google.com` |
| CNAME | （ドメイン認証用） | — | `gv-...dv.googlehosted.com` |

### Squarespace 内部レコード（触らない）

| Type | 名前 | 値 |
|---|---|---|
| CNAME | `_domainconnect` | `_domainconnect.domains.squarespace.com` |

---

## Firebase 側の設定（マネジメントは Web Console 経由）

Firebase CLI には「カスタムドメインの追加」コマンドが存在しないため、初回セットアップは Web Console で実施する：

🔗 https://console.firebase.google.com/project/makaninlabs-web/hosting/sites

1. サイト `makaninlabs-web` の「カスタムドメインを追加」ボタン
2. ドメイン名を入力（apex `makaninlabs.com` または `www.makaninlabs.com`）
3. **クイックセットアップ** モードを選択
4. 表示された A / TXT / CNAME 値を Squarespace 側に登録（上の「DNS レコード」表のとおり）
5. 「確認」ボタンで Firebase に検証を依頼
6. SSL 証明書のプロビジョニングは Firebase が自動実行（数分〜数時間）

> **www は「リダイレクト先」として apex に向ける** 設定にすることで、
> `https://www.makaninlabs.com/...` → `https://makaninlabs.com/...` に 301 で転送される。
> Firebase Console の「カスタムドメインを追加」時のチェックボックスで設定。

## ドメイン検証・伝播タイミングの目安

| ステージ | 通常 | 最大 |
|---|---|---|
| Squarespace で DNS 編集 → 世界の DNS リゾルバに伝播 | 〜数分 | 24 時間 |
| Firebase が DNS を検出して所有権確認 | 30 分〜数時間 | 24 時間 |
| Firebase の SSL 証明書プロビジョニング | 数分〜1 時間 | 24 時間 |

旧プロジェクトからドメインを移管した場合（参考：このサイトは以前 `block-drop-le7hp` プロジェクトで運用していた）、
旧プロジェクト側の所有権キャッシュが解放されるまで Firebase 検証に余分な時間がかかることがある。

## トラブルシュート

### `dig` で DNS 状態を確認する

```bash
# A レコード
dig @8.8.8.8 +short makaninlabs.com A
# → 199.36.158.100 が返ればOK

# TXT レコード
dig @8.8.8.8 +short makaninlabs.com TXT
# → "hosting-site=makaninlabs-web" が返ればOK

# www サブドメイン
dig @8.8.8.8 +short www.makaninlabs.com
# → makaninlabs-web.web.app. と続けて 199.36.158.100 が返ればOK
```

### Firebase Console で「レコードがまだ検出されていません」と出る

- DNS は正しく入っているのに Firebase が検出しないことがある（Firebase 内部の DNS キャッシュ）
- 解決策：**「終了」で閉じて 30 分〜数時間待ち、再度「確認」を押す**
- どうしても進まない場合、ドメインを一度削除して追加し直すと再検証される

### サイトが古いコンテンツのまま表示される

- ブラウザキャッシュ：シークレットウィンドウで再アクセス
- Firebase Hosting CDN キャッシュ：通常はデプロイで自動破棄されるが、まれに数分の遅延あり
- 強制更新：Cache-Control の確認は `curl -I https://makaninlabs.com/`

---

# Contact フォーム（Google Forms 連携）

`components/ContactSection.tsx` は Google フォームに `<form action target="hidden_iframe">` で POST する古典的な方式：

- フォーム URL: `https://docs.google.com/forms/d/e/1FAIpQLSdExADzQVDQZnKlN_KxupVcHd0gmdy2oUnC2BZLvIeDyCResA/formResponse`
- フィールド `name` 属性（`entry.464670817` など）は **Google フォーム側のフィールド ID とリンク** しているので、変更すると壊れる
- 送信成功は確実な確認ができない（iframe 経由のため）。エラーが起きても UI は「送信完了」を表示する仕様

レスポンスは Google フォームに紐付いた **スプレッドシート** で確認する。

---

# 設計・実装計画（履歴）

`docs/superpowers/` 以下に設計書と実装計画が保存されている：

- `specs/2026-05-02-training-pivot-design.md` — トレーニング送客サイトへの転換設計
- `plans/2026-05-02-training-pivot.md` — 9 タスクに分けた段階的実装計画

将来課題（OGP 画像刷新、Insights / Slides セクション、aria-hidden 対応など）も同設計書末尾に記録。

---

## トラブルシュート（一般）

### Build Errors

```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

`vite.config.ts` 内で `server.port` を変更するか、起動時に `--port` オプションで上書き：

```bash
npm run dev -- --port 5174
```

## License

See [LICENSE](LICENSE) file for details.

## Support

質問や問題があれば GitHub Issues で連絡してください。
