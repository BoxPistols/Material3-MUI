import { Box, Typography, Paper, Divider } from '@mui/material';

const TypographyPage: React.FC = () => {
  const typographyVariants = [
    {
      variant: 'h1' as const,
      name: 'Display Large',
      description: '最も大きな見出し。ランディングページやヒーローセクションに使用',
      sampleText: 'Display Large',
    },
    {
      variant: 'h2' as const,
      name: 'Display Medium',
      description: '大きな見出し。セクションタイトルに使用',
      sampleText: 'Display Medium',
    },
    {
      variant: 'h3' as const,
      name: 'Display Small',
      description: '中程度の見出し。サブセクションタイトルに使用',
      sampleText: 'Display Small',
    },
    {
      variant: 'h4' as const,
      name: 'Headline Large',
      description: '大きなヘッドライン。記事タイトルなどに使用',
      sampleText: 'Headline Large',
    },
    {
      variant: 'h5' as const,
      name: 'Headline Medium',
      description: '中程度のヘッドライン。カードタイトルなどに使用',
      sampleText: 'Headline Medium',
    },
    {
      variant: 'h6' as const,
      name: 'Headline Small',
      description: '小さなヘッドライン。リストアイテムのタイトルなどに使用',
      sampleText: 'Headline Small',
    },
    {
      variant: 'subtitle1' as const,
      name: 'Title Large',
      description: '大きなタイトル。ツールバーやタブに使用',
      sampleText: 'Title Large',
    },
    {
      variant: 'subtitle2' as const,
      name: 'Title Medium',
      description: '中程度のタイトル。リストアイテムのサブタイトルに使用',
      sampleText: 'Title Medium',
    },
    {
      variant: 'body1' as const,
      name: 'Body Large',
      description: '大きな本文テキスト。メインコンテンツに使用',
      sampleText: 'Body Large - これは本文テキストの例です。読みやすさを重視したサイズと行間で設計されています。',
    },
    {
      variant: 'body2' as const,
      name: 'Body Medium',
      description: '中程度の本文テキスト。説明文やキャプションに使用',
      sampleText: 'Body Medium - これは説明文やキャプションに使用される中程度のサイズのテキストです。',
    },
    {
      variant: 'caption' as const,
      name: 'Body Small',
      description: '小さな本文テキスト。補足情報や注釈に使用',
      sampleText: 'Body Small - 補足情報や注釈に使用される小さなテキストです。',
    },
    {
      variant: 'button' as const,
      name: 'Label Large',
      description: 'ボタンのラベル。アクション要素に使用',
      sampleText: 'Label Large',
    },
    {
      variant: 'overline' as const,
      name: 'Label Small',
      description: '小さなラベル。タグやカテゴリ表示に使用',
      sampleText: 'LABEL SMALL',
    },
  ];

  const colorVariants = [
    { color: 'text.primary', name: 'Primary Text', description: 'メインテキスト' },
    { color: 'text.secondary', name: 'Secondary Text', description: 'セカンダリテキスト' },
    { color: 'primary.main', name: 'Primary Color', description: 'プライマリカラー' },
    { color: 'secondary.main', name: 'Secondary Color', description: 'セカンダリカラー' },
    { color: 'error.main', name: 'Error Color', description: 'エラーカラー' },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        📝 Material Design 3 タイポグラフィ
      </Typography>
      
      <Typography variant="body1" paragraph>
        Material Design 3のタイポグラフィスケールは、読みやすさとヒエラルキーを重視して設計されています。
        各バリアントは特定の用途に最適化されており、一貫したユーザーエクスペリエンスを提供します。
      </Typography>

      {/* Typography Scale */}
      <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          タイポグラフィスケール
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {typographyVariants.map((typo) => (
            <Box key={typo.variant}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {typo.name} ({typo.variant})
                </Typography>
                <Typography variant="caption" color="text.secondary" paragraph>
                  {typo.description}
                </Typography>
              </Box>
              <Typography variant={typo.variant} sx={{ mb: 2 }}>
                {typo.sampleText}
              </Typography>
              <Divider />
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Color Variants */}
      <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          テキストカラーバリエーション
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {colorVariants.map((colorInfo) => (
            <Box key={colorInfo.name}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {colorInfo.name} - {colorInfo.description}
              </Typography>
              <Typography variant="h6" color={colorInfo.color}>
                {colorInfo.name}のサンプルテキストです
              </Typography>
              <Typography variant="body1" color={colorInfo.color}>
                これは{colorInfo.description}を使用した本文テキストの例です。
                Material Design 3では、適切なコントラスト比を保ちながら、
                美しいタイポグラフィを実現しています。
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Typography Guidelines */}
      <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          使用ガイドライン
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" gutterBottom>
            ヒエラルキーの原則
          </Typography>
          <Typography variant="body2" paragraph>
            • <strong>Display:</strong> 最も重要な情報（ページタイトル、ヒーロー見出し）
          </Typography>
          <Typography variant="body2" paragraph>
            • <strong>Headline:</strong> セクションの見出し（記事タイトル、カードヘッダー）
          </Typography>
          <Typography variant="body2" paragraph>
            • <strong>Title:</strong> 小さなコンポーネントのタイトル（ツールバー、タブ）
          </Typography>
          <Typography variant="body2" paragraph>
            • <strong>Body:</strong> 本文テキスト（記事内容、説明文）
          </Typography>
          <Typography variant="body2" paragraph>
            • <strong>Label:</strong> UI要素のラベル（ボタン、フォーム）
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="h6" gutterBottom>
            アクセシビリティ
          </Typography>
          <Typography variant="body2" paragraph>
            • 最小フォントサイズ: 12px（Label Small）
          </Typography>
          <Typography variant="body2" paragraph>
            • 推奨行間: 1.4〜1.6倍
          </Typography>
          <Typography variant="body2" paragraph>
            • コントラスト比: AA準拠（4.5:1以上）
          </Typography>
          <Typography variant="body2" paragraph>
            • 読みやすい文字幅: 45〜75文字/行
          </Typography>
        </Box>
      </Paper>

      {/* Sample Content */}
      <Paper elevation={1} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          実際の使用例
        </Typography>
        
        <Typography variant="h4" gutterBottom>
          記事のタイトル例
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          2024年1月15日 | カテゴリ: デザイン
        </Typography>
        <Typography variant="body1" paragraph>
          これは記事の本文の例です。Material Design 3のタイポグラフィシステムを使用することで、
          読みやすく美しいテキストレイアウトを実現できます。適切な文字サイズ、行間、
          カラーコントラストにより、ユーザーは快適に情報を読み取ることができます。
        </Typography>
        <Typography variant="body2" color="text.secondary">
          この段落は補足情報を示すために、少し小さなフォントサイズとセカンダリカラーを使用しています。
        </Typography>
      </Paper>
    </Box>
  );
};

export default TypographyPage; 