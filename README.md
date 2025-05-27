# Material Design 3 + MUI 7

このプロジェクトは、**MUI v7**のデフォルトスタイルを拡張し、**Material Design 3（Material You）**のデザインシステムを実装したReact + TypeScriptアプリケーションです。

## 概要

Material Design 3は、Googleが2021年に発表した最新のデザインシステムで、動的カラー、パーソナライゼーション、アクセシビリティに重点を置いています。このプロジェクトでは、MUI v7の基盤を活用しながら、Material Design 3の特徴的な要素を実装しています。

## 主な特徴

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

### 4. SaaS Dashboard Example
実際のSaaSアプリケーションを模したモックのAdmin画面：

- **統計カード**: 売上、ユーザー数、注文数、ページビューの表示
- **データテーブル**: 注文管理テーブル（検索、フィルター、ページネーション）
- **チャートエリア**: 売上推移グラフ用のプレースホルダー
- **アクティビティフィード**: 最近のユーザーアクション表示
- **プロジェクト進捗**: 進捗バーとデッドライン表示
- **アクションボタン**: CRUD操作用のボタン群

### 5. カスタムButtonバリアント
MUI v7の標準Buttonコンポーネントを拡張し、Material Design 3の新しいバリアントを追加：

- **`filled`**: プライマリアクション用の塗りつぶしボタン
- **`elevated`**: 影付きの立体的なボタン
- **`tonal`**: セカンダリコンテナカラーを使用したボタン
- **`outlined`**: アウトライン付きボタン（Material Design 3スタイル）
- **`text`**: テキストのみのボタン

**サイズバリエーション対応:**
- **`small`**: 32px高さ、コンパクトなUI用
- **`medium`**: 40px高さ、標準サイズ
- **`large`**: 48px高さ、重要なアクション用

### 6. ブラウザデフォルトフォーム
Material Design 3のフォームコンポーネントをブラウザデフォルトスタイルに近づけた実装：

- **ラベルアニメーション無効化**: フローティングラベルを静的ラベルに変更
- **シンプルなフォーカス**: 複雑なアニメーションを排除
- **ブラウザ互換性**: 標準的なフォーム動作を維持
- **アクセシビリティ**: スクリーンリーダー対応を強化

### 7. TypeScript型安全性
- カスタムバリアントの完全な型サポート
- MUIコンポーネントの型拡張
- 厳格な型チェック（`any`型の使用を最小限に抑制）

### 8. テーマ永続化
- **ローカルストレージ**: ユーザーのテーマ設定とカラー選択を自動保存
- **システム設定連動**: OSのダークモード設定に自動対応
- **グローバルナビゲーション**: ワンクリックでのテーマ切り替え

## 🚀 技術スタック

- **React 19.1.0**: 最新のReactフレームワーク
- **MUI v7.1.0**: Material-UIの最新バージョン
- **Material Icons**: 公式Material Iconsライブラリ
- **Material Color Utilities**: Googleの公式カラー生成ライブラリ
- **TanStack Router**: 型安全なルーティングライブラリ
- **TypeScript 5.8.3**: 型安全な開発
- **Vite 6.3.5**: 高速なビルドツール
- **Emotion**: CSS-in-JSライブラリ

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build
```

## プロジェクト構造

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

## 実装の詳細

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

## カラーシステムの特徴

### MUI v7標準カラーとの統合

現在の実装では、Material Design 3のカラートークンとMUI v7の標準カラーシステムが完全に統合されています：

#### Primary Color System
```typescript
primary: {
  main: colors.primary,           // Material Design 3のprimaryトーン
  light: colors.primaryContainer, // プライマリコンテナカラー
  dark: colors.primary,           // ライトモードではprimary、ダークモードではprimaryContainer
  contrastText: colors.onPrimary, // プライマリ上のテキストカラー
}
```

#### Secondary & Error Colors
- **Secondary**: `main`, `light`, `dark`, `contrastText`の完全サポート
- **Error**: エラー状態用の完全なカラーバリエーション

#### Grey Palette Integration
Material Design 3のニュートラルカラーをMUIのgreyパレット（50-900）にマッピング：
```typescript
grey: {
  50: mode === 'light' ? colors.surface : colors.surfaceVariant,
  100: mode === 'light' ? colors.surfaceVariant : colors.surface,
  200: colors.outlineVariant,
  300: colors.outline,
  // ... 完全な9段階グレースケール
}
```

### インタラクティブカラー選択

- **カラーピッカー**: HTML5カラーピッカーとHEX入力の両方をサポート
- **プリセットカラー**: Material Design 3推奨カラーのクイック選択
- **リアルタイム反映**: 選択と同時に全UIが更新
- **永続化**: 選択したカラーを自動保存

### 動的生成プロセス

1. **プライマリカラー選択**: ユーザーがカラーピッカーで選択
2. **Material Color Utilities**: Googleのアルゴリズムでカラーパレット生成
3. **トーン計算**: ライト/ダークモードに最適化されたトーン値（40/80トーンシステム）
4. **アクセシビリティ**: 自動的なコントラスト比計算（WCAG準拠）
5. **即座の適用**: 全コンポーネントに瞬時に反映

### Material Design 3カラートークン

#### Core Color Roles
- **Primary**: メインブランドカラー（ユーザー選択、トーン40/80）
- **Secondary**: セカンダリアクション用カラー（自動生成、調和アルゴリズム）
- **Tertiary**: アクセントカラー（自動生成、補色関係）
- **Error**: エラー状態の表示（自動生成、赤系統）

#### Surface & Background
- **Surface**: コンテナ背景（トーン99/10）
- **Background**: アプリ背景（トーン99/10）
- **Surface Variant**: 代替サーフェス（トーン90/30）

#### Text & Outline
- **On-Colors**: 各カラー上のテキスト（最適コントラスト）
- **Outline**: 境界線とディバイダー（トーン50/60）
- **Outline Variant**: 軽い境界線（トーン80/30）

#### Inverse Colors
- **Inverse Surface**: 反転サーフェス（ダークモード風）
- **Inverse Primary**: 反転プライマリ（強調用）

### カラー采配の設計思想

#### 1. 科学的色彩調和
Material Color Utilitiesは、人間の色覚と心理学に基づいた科学的アルゴリズムを使用：
- **HCT色空間**: 色相（Hue）、彩度（Chroma）、トーン（Tone）
- **知覚的均等性**: 人間の目に自然に映る色の変化
- **調和アルゴリズム**: プライマリから自動的に調和する色を生成

#### 2. アクセシビリティファースト
- **WCAG 2.1 AA準拠**: 最低4.5:1のコントラスト比
- **色覚多様性対応**: 色盲・色弱の方にも識別可能
- **自動コントラスト計算**: テキストと背景の最適な組み合わせ

#### 3. ライト/ダークモード最適化
- **トーンシステム**: ライト（40トーン）、ダーク（80トーン）
- **表面の階層**: 複数のサーフェスレベルで奥行き表現
- **一貫性**: 両モードで同じ視覚的重要度を維持

## ダークモード機能

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

## MUI v7からの主な変更点

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

## レスポンシブ対応

- **モバイルファーストデザイン**: 小画面から大画面まで最適化
- **アダプティブナビゲーション**: デスクトップではテキスト付き、モバイルではアイコンのみ
- **MUI v7の新しいGrid API**: フレキシブルレイアウト
- **ダークモード対応**: 全デバイスでダークモードサポート

## Material Design 3の実装

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

## コントリビューション

このプロジェクトは、Material Design 3とMUI v7の統合のベストプラクティスを示すことを目的としています。改善提案やバグレポートは歓迎します。

## ライセンス

MIT License

---

**Material Design 3 + MUI 7** - インタラクティブな次世代デザインシステムを今すぐ体験
