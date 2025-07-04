# おみくじNext.js

Next.jsで作成されたおみくじアプリケーションです。

## 機能

- おみくじを引く
- 運勢の履歴表示
- ユーザー認証
- テーマ切り替え
- ラッキーアイテム表示

## GitHub Pagesへのデプロイ

このプロジェクトはGitHub Actionsを使用してGitHub Pagesに自動デプロイされます。

### 設定手順

1. GitHubリポジトリの設定で、Pages設定を開く
2. Source を "GitHub Actions" に設定
3. mainブランチにプッシュすると自動的にデプロイされます

### ローカル開発

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# 静的サイト生成
npm run export
```

## 技術スタック

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## デプロイURL

GitHub Pagesでデプロイされたサイト: `https://[ユーザー名].github.io/omikuji-nextjs/`