# おみくじの館 Next.js版 🎋

Next.js、TypeScript、Tailwind CSS、Framer Motionを使用した、演出豊かなおみくじサイトです。

## 特徴

- **6種類のおみくじ**: 恋愛運、仕事運、健康運、金運、学業運、総合運
- **豊富な演出**: Framer Motionによる滑らかなアニメーション
- **レスポンシブデザイン**: モバイルからデスクトップまで対応
- **TypeScript**: 型安全な開発
- **Tailwind CSS**: モダンなスタイリング

## 技術スタック

- **Next.js 14**: React フレームワーク
- **TypeScript**: 型安全性
- **Tailwind CSS**: ユーティリティファーストCSS
- **Framer Motion**: アニメーションライブラリ

## セットアップ

1. 依存関係のインストール:
```bash
npm install
```

2. 開発サーバーの起動:
```bash
npm run dev
```

3. ブラウザで http://localhost:3000 を開く

## 演出の特徴

### おみくじを引く時の演出
- カードの回転アニメーション
- ローディング画面での竹のアイコン回転
- パルス効果とグロー効果

### 結果表示の演出
- モーダルのスライドイン
- アイコンの回転登場
- 運勢レベルのスケールアニメーション
- 装飾要素の浮遊アニメーション

### インタラクション
- ホバー時のカード浮上効果
- ボタンクリック時のスケール変化
- 背景のグラデーション効果

## ファイル構成

```
omikuji-nextjs/
├── src/
│   ├── app/
│   │   ├── globals.css      # グローバルスタイル
│   │   ├── layout.tsx       # レイアウトコンポーネント
│   │   └── page.tsx         # メインページ
│   ├── components/
│   │   ├── OmikujiCard.tsx  # おみくじカード
│   │   └── OmikujiModal.tsx # 結果表示モーダル
│   └── data/
│       └── omikujiData.ts   # おみくじデータ
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## カスタマイズ

### 新しいおみくじの追加
`src/data/omikujiData.ts` に新しい種類を追加できます。

### アニメーションの調整
各コンポーネントのFramer Motionプロパティを変更してアニメーションをカスタマイズできます。

### スタイルの変更
Tailwind CSSクラスを変更するか、`globals.css`でカスタムスタイルを追加できます。

## ビルド

```bash
npm run build
npm start
```

## ライセンス

MIT License

---

毎日の運勢をお楽しみください！ 🌟