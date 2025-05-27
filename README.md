# Material Design 3 + MUI 7

このプロジェクトは、**MUI v7**のデフォルトスタイルを拡張し、**Material Design 3（Material You）**のデザインシステムを実装したReact + TypeScriptアプリケーションです。

## 🎨 概要

Material Design 3は、Googleが2021年に発表した最新のデザインシステムで、動的カラー、パーソナライゼーション、アクセシビリティに重点を置いています。このプロジェクトでは、MUI v7の基盤を活用しながら、Material Design 3の特徴的な要素を実装しています。

## ✨ 主な特徴

### 1. Material Design 3 カラーシステム
- **動的カラーパレット**: Material Design 3の完全なカラートークンセット
- **ライト/ダークテーマ対応**: 自動的なテーマ切り替え
- **アクセシビリティ**: WCAG準拠のコントラスト比

### 2. カスタムButtonバリアント
MUI v7の標準Buttonコンポーネントを拡張し、Material Design 3の新しいバリアントを追加：

- **`filled`**: プライマリアクション用の塗りつぶしボタン
- **`elevated`**: 影付きの立体的なボタン
- **`tonal`**: セカンダリコンテナカラーを使用したボタン
- **`outlined`**: アウトライン付きボタン（Material Design 3スタイル）
- **`text`**: テキストのみのボタン

### 3. TypeScript型安全性
- カスタムバリアントの完全な型サポート
- MUIコンポーネントの型拡張
- 厳格な型チェック（`any`型の使用を最小限に抑制）

## 🛠️ 技術スタック

- **React 19.1.0**: 最新のReactフレームワーク
- **MUI v7.1.0**: Material-UIの最新バージョン
- **TanStack Router**: 型安全なルーティングライブラリ
- **TypeScript 5.8.3**: 型安全な開発
- **Vite 6.3.5**: 高速なビルドツール
- **Emotion**: CSS-in-JSライブラリ

## 🚀 セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build
```

## 📁 プロジェクト構造

```
src/
├── components/          # Reactコンポーネント
│   └── AppNavigation.tsx
├── pages/              # ページコンポーネント
│   ├── HomePage.tsx
│   ├── ColorsPage.tsx
│   ├── ButtonsPage.tsx
│   ├── ComponentsPage.tsx
│   └── TypographyPage.tsx
├── routes/             # TanStack Routerルート定義
│   ├── __root.tsx
│   ├── index.tsx
│   ├── colors.tsx
│   ├── buttons.tsx
│   ├── components.tsx
│   └── typography.tsx
├── types/              # TypeScript型定義
│   └── mui.d.ts        # MUIコンポーネントの型拡張
├── theme.ts            # Material Design 3テーマ設定
├── App.tsx             # メインアプリケーション
├── main.tsx            # エントリーポイント
└── routeTree.gen.ts    # 自動生成されたルートツリー
```

## 🎯 実装の詳細

### MUI v7の新しいGrid API

MUI v7では、Gridコンポーネントの新しいAPIが導入されました：

```typescript
// 新しいAPI（v7）
<Grid container spacing={2}>
  <Grid size={{ xs: 12, md: 6 }}>
    <Card>コンテンツ</Card>
  </Grid>
</Grid>

// 旧API（v6以前）
<Grid container spacing={2}>
  <Grid xs={12} md={6}>
    <Card>コンテンツ</Card>
  </Grid>
</Grid>
```

### TanStack Routerの型安全ルーティング

ファイルベースルーティングと完全な型安全性を提供：

```typescript
// ルート定義
export const Route = createFileRoute('/colors')({
  component: ColorsPage,
})

// 型安全なナビゲーション
<Link to="/colors">カラーページ</Link>
```

### カスタムテーマの作成

`src/theme.ts`では、Material Design 3の完全なカラーパレットを定義し、MUIのテーマシステムと統合しています：

```typescript
// Material Design 3の標準カラートークン
export const materialColors = {
  light: {
    primary: '#65558F',
    onPrimary: '#FFFFFF',
    primaryContainer: '#E7DEFF',
    // ... 完全なカラーセット
  },
  dark: {
    // ダークテーマ対応
  }
}
```

### 型安全なカスタムバリアント

`src/types/mui.d.ts`でMUIのButton型を拡張：

```typescript
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    elevated: true;
    filled: true;
    tonal: true;
  }
}
```

## 🎨 カラーシステムの特徴

- **Primary**: メインブランドカラー（#65558F）
- **Secondary**: セカンダリアクション用カラー
- **Tertiary**: アクセントカラー
- **Error**: エラー状態の表示
- **Surface**: 背景とコンテナ
- **Outline**: 境界線とディバイダー

各カラーには対応する「on-color」（テキスト用）が定義されており、適切なコントラスト比を保証しています。

## 🔄 MUI v7からの主な変更点

1. **新しいGrid API**: `size`プロパティを使用したレスポンシブレイアウト
2. **新しいButtonバリアント**: Material Design 3準拠の4つの新バリアント
3. **カラーパレットの完全置換**: Material Design 3のカラートークンシステム
4. **タイポグラフィの調整**: `textTransform: 'none'`でMaterial Design 3スタイル
5. **角丸の統一**: `borderRadius: 40px`でMaterial Design 3の丸みを実現

## 🚦 ルーティングシステム

TanStack Routerによる型安全なルーティング：

- **ファイルベースルーティング**: `src/routes/`ディレクトリ内のファイル構造がルートに対応
- **自動コード生成**: `routeTree.gen.ts`が自動生成される
- **完全な型安全性**: リンクやナビゲーションで型チェックが効く
- **開発者ツール**: ルーティングの状態を可視化

## 📱 レスポンシブ対応

- モバイルファーストデザイン
- タブレット・デスクトップ対応
- MUI v7の新しいGrid APIによるフレキシブルレイアウト

## 🌙 ダークテーマ

Material Design 3の動的カラーシステムに基づいたダークテーマを完全サポート。システム設定に応じた自動切り替えも可能です。

## 🤝 コントリビューション

このプロジェクトは、Material Design 3とMUI v7の統合のベストプラクティスを示すことを目的としています。改善提案やバグレポートは歓迎します。

## 📄 ライセンス

MIT License

---

**Material Design 3 + MUI 7** - 次世代のデザインシステムを今すぐ体験
