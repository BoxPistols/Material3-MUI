# Material Design 3 + MUI 7

このプロジェクトは、**MUI v7**のデフォルトスタイルを拡張し、**Material Design 3（Material You）**のデザインシステムを実装したReact + TypeScriptアプリケーションです。

## 🎨 概要

Material Design 3は、Googleが2021年に発表した最新のデザインシステムで、動的カラー、パーソナライゼーション、アクセシビリティに重点を置いています。このプロジェクトでは、MUI v7の基盤を活用しながら、Material Design 3の特徴的な要素を実装しています。

## ✨ 主な特徴

### 1. 動的カラー生成システム
- **Material Color Utilities**: Googleの公式ライブラリを使用した動的カラー生成
- **単一カラーから完全パレット**: プライマリカラー1色から全カラートークンを自動生成
- **ライト/ダークテーマ対応**: 自動的なテーマ切り替えとローカルストレージ永続化
- **アクセシビリティ**: WCAG準拠のコントラスト比を自動計算

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

### 4. テーマ永続化
- **ローカルストレージ**: ユーザーのテーマ設定を自動保存
- **システム設定連動**: OSのダークモード設定に自動対応
- **グローバルナビゲーション**: ワンクリックでのテーマ切り替え

## 🛠️ 技術スタック

- **React 19.1.0**: 最新のReactフレームワーク
- **MUI v7.1.0**: Material-UIの最新バージョン
- **Material Color Utilities**: Googleの公式カラー生成ライブラリ
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
├── contexts/           # Reactコンテキスト
│   └── ThemeContext.tsx # テーマ管理コンテキスト
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

### 動的カラー生成

Material Color Utilitiesを使用して、単一のプライマリカラーから完全なカラーパレットを生成：

```typescript
import { themeFromSourceColor, argbFromHex, hexFromArgb } from '@material/material-color-utilities';

const PRIMARY_COLOR = '#65558F';
const materialTheme = themeFromSourceColor(argbFromHex(PRIMARY_COLOR));

// ライトテーマのカラー生成例
export const lightColors = {
  primary: argbToHex(materialTheme.palettes.primary.tone(40)),
  onPrimary: argbToHex(materialTheme.palettes.primary.tone(100)),
  primaryContainer: argbToHex(materialTheme.palettes.primary.tone(90)),
  // ... 他のカラートークン
};
```

### テーマコンテキスト

React Contextを使用したグローバルテーマ管理：

```typescript
const { mode, toggleMode } = useTheme();
const theme = createMaterialTheme(mode);
```

### MUI v7の新しいGrid API

MUI v7では、Gridコンポーネントの新しいAPIが導入されました：

```typescript
// 新しいAPI（v7）
<Grid container spacing={2}>
  <Grid size={{ xs: 12, md: 6 }}>
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

## 🎨 カラーシステムの特徴

### 動的生成プロセス

1. **プライマリカラー設定**: `#65558F`（Material Design 3のPurple）
2. **Material Color Utilities**: Googleのアルゴリズムでカラーパレット生成
3. **トーン計算**: ライト/ダークモードに最適化されたトーン値
4. **アクセシビリティ**: 自動的なコントラスト比計算

### カラートークン

- **Primary**: メインブランドカラー
- **Secondary**: セカンダリアクション用カラー
- **Tertiary**: アクセントカラー
- **Error**: エラー状態の表示
- **Surface**: 背景とコンテナ
- **Outline**: 境界線とディバイダー

各カラーには対応する「on-color」（テキスト用）が自動生成され、適切なコントラスト比を保証しています。

## 🌙 ダークモード機能

### 特徴

- **自動検出**: システムのダークモード設定を自動検出
- **永続化**: ローカルストレージでユーザー設定を保存
- **即座の切り替え**: ナビゲーションバーのボタンでワンクリック切り替え
- **完全対応**: 全コンポーネントがダークモードに対応

### 実装

```typescript
// テーマコンテキストの使用
const { mode, toggleMode } = useTheme();

// 動的テーマ生成
const theme = createMaterialTheme(mode);
```

## 🔄 MUI v7からの主な変更点

1. **動的カラー生成**: Material Color Utilitiesによる自動カラーパレット生成
2. **新しいGrid API**: `size`プロパティを使用したレスポンシブレイアウト
3. **新しいButtonバリアント**: Material Design 3準拠の4つの新バリアント
4. **テーマ永続化**: ローカルストレージとシステム設定連動
5. **タイポグラフィの調整**: `textTransform: 'none'`でMaterial Design 3スタイル
6. **角丸の統一**: `borderRadius: 12px`でMaterial Design 3の丸みを実現

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
- ダークモード対応のレスポンシブUI

## 🎯 Material Design 3の実装

### 動的カラー（Material You）

- **単一ソースカラー**: プライマリカラー1色から全パレット生成
- **調和のとれたカラー**: 科学的アルゴリズムによる色彩調和
- **アクセシビリティ**: 自動的なコントラスト比最適化

### 新しいコンポーネントスタイル

- **丸みのあるデザイン**: 12px〜40pxの統一された角丸
- **エレベーション**: 適切な影とレイヤリング
- **タイポグラフィ**: Material Design 3のタイプスケール

## 🤝 コントリビューション

このプロジェクトは、Material Design 3とMUI v7の統合のベストプラクティスを示すことを目的としています。改善提案やバグレポートは歓迎します。

## 📄 ライセンス

MIT License

---

**Material Design 3 + MUI 7** - 次世代のデザインシステムを今すぐ体験
