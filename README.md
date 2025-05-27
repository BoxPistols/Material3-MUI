# Material Design 3 + MUI 7

このプロジェクトは、**MUI v7**のデフォルトスタイルを拡張し、**Material Design 3（Material You）**のデザインシステムを実装したReact + TypeScriptアプリケーションです。

## 🎨 概要

Material Design 3は、Googleが2021年に発表した最新のデザインシステムで、動的カラー、パーソナライゼーション、アクセシビリティに重点を置いています。このプロジェクトでは、MUI v7の基盤を活用しながら、Material Design 3の特徴的な要素を実装しています。

## ✨ 主な特徴

### 1. インタラクティブ動的カラー生成システム
- **リアルタイムカラーピッカー**: ナビゲーションバーからワンクリックでプライマリカラーを変更
- **Material Color Utilities**: Googleの公式ライブラリを使用した動的カラー生成
- **単一カラーから完全パレット**: 選択したプライマリカラーから全カラートークンを自動生成
- **即座の反映**: カラー変更が全コンポーネントに瞬時に適用
- **永続化**: 選択したカラーをローカルストレージに自動保存

### 2. 改善されたナビゲーション
- **Sticky Header**: スクロール時も常に表示されるナビゲーション
- **Material Icons**: 絵文字ではなく公式Material Iconsを使用
- **レスポンシブデザイン**: デスクトップではテキスト付き、モバイルではアイコンのみ
- **視覚的フィードバック**: 現在のページを明確に表示

### 3. MUI v7ベースコーディング親和性
- **標準カラーバリエーション**: `light`、`dark`、`main`の完全サポート
- **グレースケール統合**: Material Design 3カラーとMUIのgreyパレットの統合
- **コンポーネント互換性**: 既存のMUIコンポーネントとの完全な互換性

### 4. カスタムButtonバリアント
MUI v7の標準Buttonコンポーネントを拡張し、Material Design 3の新しいバリアントを追加：

- **`filled`**: プライマリアクション用の塗りつぶしボタン
- **`elevated`**: 影付きの立体的なボタン
- **`tonal`**: セカンダリコンテナカラーを使用したボタン
- **`outlined`**: アウトライン付きボタン（Material Design 3スタイル）
- **`text`**: テキストのみのボタン

### 5. TypeScript型安全性
- カスタムバリアントの完全な型サポート
- MUIコンポーネントの型拡張
- 厳格な型チェック（`any`型の使用を最小限に抑制）

### 6. テーマ永続化
- **ローカルストレージ**: ユーザーのテーマ設定とカラー選択を自動保存
- **システム設定連動**: OSのダークモード設定に自動対応
- **グローバルナビゲーション**: ワンクリックでのテーマ切り替え

## ��️ 技術スタック

- **React 19.1.0**: 最新のReactフレームワーク
- **MUI v7.1.0**: Material-UIの最新バージョン
- **Material Icons**: 公式Material Iconsライブラリ
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
│   └── AppNavigation.tsx # ナビゲーション（カラーピッカー付き）
├── contexts/           # Reactコンテキスト
│   └── ThemeContext.tsx # テーマ・カラー管理コンテキスト
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

### インタラクティブカラーピッカー

ナビゲーションバーのパレットアイコンから、リアルタイムでプライマリカラーを変更：

```typescript
// カラーピッカーの実装
const { primaryColor, setPrimaryColor } = useTheme();

// 動的テーマ生成
const theme = createMaterialTheme(mode, primaryColor);

// カラー変更時の処理
const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setPrimaryColor(event.target.value);
};
```

### 動的カラー生成

Material Color Utilitiesを使用して、選択したプライマリカラーから完全なカラーパレットを生成：

```typescript
export const generateColorsFromPrimary = (primaryColor: string) => {
  const materialTheme = themeFromSourceColor(argbFromHex(primaryColor));
  
  return {
    light: {
      primary: argbToHex(materialTheme.palettes.primary.tone(40)),
      onPrimary: argbToHex(materialTheme.palettes.primary.tone(100)),
      // ... 他のカラートークン
    },
    dark: {
      primary: argbToHex(materialTheme.palettes.primary.tone(80)),
      // ... ダークモード用カラー
    }
  };
};
```

### MUI v7親和性の向上

標準的なMUIカラーバリエーションとの互換性を確保：

```typescript
palette: {
  primary: {
    main: colors.primary,
    light: colors.primaryContainer,
    dark: mode === 'light' ? colors.primary : colors.primaryContainer,
    contrastText: colors.onPrimary,
  },
  // MUI v7の標準greyパレットとの統合
  grey: {
    50: mode === 'light' ? colors.surface : colors.surfaceVariant,
    // ... 完全なgreyスケール
  },
}
```

### Sticky Navigation

スクロール時も常に表示されるナビゲーション：

```typescript
MuiAppBar: {
  styleOverrides: {
    root: {
      position: 'sticky',
      top: 0,
      zIndex: 1100,
    },
  },
},
```

## 🎨 カラーシステムの特徴

### インタラクティブカラー選択

- **カラーピッカー**: HTML5カラーピッカーとHEX入力の両方をサポート
- **プリセットカラー**: Material Design 3推奨カラーのクイック選択
- **リアルタイム反映**: 選択と同時に全UIが更新
- **永続化**: 選択したカラーを自動保存

### 動的生成プロセス

1. **プライマリカラー選択**: ユーザーがカラーピッカーで選択
2. **Material Color Utilities**: Googleのアルゴリズムでカラーパレット生成
3. **トーン計算**: ライト/ダークモードに最適化されたトーン値
4. **アクセシビリティ**: 自動的なコントラスト比計算
5. **即座の適用**: 全コンポーネントに瞬時に反映

### カラートークン

- **Primary**: メインブランドカラー（ユーザー選択）
- **Secondary**: セカンダリアクション用カラー（自動生成）
- **Tertiary**: アクセントカラー（自動生成）
- **Error**: エラー状態の表示（自動生成）
- **Surface**: 背景とコンテナ（自動生成）
- **Outline**: 境界線とディバイダー（自動生成）

## 🌙 ダークモード機能

### 特徴

- **自動検出**: システムのダークモード設定を自動検出
- **永続化**: ローカルストレージでユーザー設定を保存
- **即座の切り替え**: ナビゲーションバーのボタンでワンクリック切り替え
- **完全対応**: 全コンポーネントがダークモードに対応
- **Material Icons**: ライト/ダークモードに応じたアイコン表示

### 実装

```typescript
// テーマコンテキストの使用
const { mode, toggleMode, primaryColor } = useTheme();

// 動的テーマ生成
const theme = createMaterialTheme(mode, primaryColor);
```

## 🔄 MUI v7からの主な変更点

1. **インタラクティブカラーピッカー**: リアルタイムでのプライマリカラー変更
2. **Material Icons統合**: 絵文字からMaterial Iconsへの移行
3. **Sticky Navigation**: 常に表示されるナビゲーションヘッダー
4. **MUI v7親和性向上**: 標準カラーバリエーションとgreyパレットの統合
5. **動的カラー生成**: Material Color Utilitiesによる自動カラーパレット生成
6. **新しいGrid API**: `size`プロパティを使用したレスポンシブレイアウト
7. **新しいButtonバリアント**: Material Design 3準拠の4つの新バリアント
8. **テーマ永続化**: ローカルストレージとシステム設定連動

## 🚦 ルーティングシステム

TanStack Routerによる型安全なルーティング：

- **ファイルベースルーティング**: `src/routes/`ディレクトリ内のファイル構造がルートに対応
- **自動コード生成**: `routeTree.gen.ts`が自動生成される
- **完全な型安全性**: リンクやナビゲーションで型チェックが効く
- **開発者ツール**: ルーティングの状態を可視化

## 📱 レスポンシブ対応

- **モバイルファーストデザイン**: 小画面から大画面まで最適化
- **アダプティブナビゲーション**: デスクトップではテキスト付き、モバイルではアイコンのみ
- **MUI v7の新しいGrid API**: フレキシブルレイアウト
- **ダークモード対応**: 全デバイスでダークモードサポート

## 🎯 Material Design 3の実装

### 動的カラー（Material You）

- **ユーザー選択カラー**: 任意のプライマリカラーから全パレット生成
- **調和のとれたカラー**: 科学的アルゴリズムによる色彩調和
- **アクセシビリティ**: 自動的なコントラスト比最適化
- **リアルタイム更新**: 選択と同時に全UIが更新

### 新しいコンポーネントスタイル

- **丸みのあるデザイン**: 12px〜40pxの統一された角丸
- **エレベーション**: 適切な影とレイヤリング
- **タイポグラフィ**: Material Design 3のタイプスケール
- **Material Icons**: 公式アイコンライブラリの使用

## 🤝 コントリビューション

このプロジェクトは、Material Design 3とMUI v7の統合のベストプラクティスを示すことを目的としています。改善提案やバグレポートは歓迎します。

## 📄 ライセンス

MIT License

---

**Material Design 3 + MUI 7** - インタラクティブな次世代デザインシステムを今すぐ体験
