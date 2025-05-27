import { Box, Typography, Button, Paper, Divider } from '@mui/material';

const ButtonsPage: React.FC = () => {
  const buttonVariants = [
    {
      title: 'Filled Button',
      variant: 'filled' as const,
      description: 'プライマリアクション用の最も目立つボタン。重要なアクションに使用します。',
    },
    {
      title: 'Elevated Button',
      variant: 'elevated' as const,
      description: '影付きの立体的なボタン。背景から浮き上がって見えます。',
    },
    {
      title: 'Tonal Button',
      variant: 'tonal' as const,
      description: 'セカンダリコンテナカラーを使用した中程度の強調レベルのボタン。',
    },
    {
      title: 'Outlined Button',
      variant: 'outlined' as const,
      description: 'アウトライン付きのボタン。セカンダリアクションに適しています。',
    },
    {
      title: 'Text Button',
      variant: 'text' as const,
      description: '最も控えめなボタン。補助的なアクションに使用します。',
    },
  ];

  const buttonStates = [
    { label: 'Default', props: {} },
    { label: 'Disabled', props: { disabled: true } },
  ];

  const buttonSizes = [
    { label: 'Small', props: { size: 'small' as const } },
    { label: 'Medium', props: { size: 'medium' as const } },
    { label: 'Large', props: { size: 'large' as const } },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        🔘 Material Design 3 ボタンバリアント
      </Typography>
      
      <Typography variant="body1" paragraph>
        Material Design 3では、5つの主要なボタンバリアントが定義されています。
        各バリアントは異なる視覚的重要度を持ち、適切な使用場面があります。
      </Typography>

      {buttonVariants.map((buttonInfo) => (
        <Paper key={buttonInfo.variant} elevation={1} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            {buttonInfo.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {buttonInfo.description}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              基本スタイル
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
              {buttonStates.map((state) => (
                <Button
                  key={state.label}
                  variant={buttonInfo.variant}
                  {...state.props}
                >
                  {state.label}
                </Button>
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              サイズバリエーション
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
              {buttonSizes.map((size) => (
                <Button
                  key={size.label}
                  variant={buttonInfo.variant}
                  {...size.props}
                >
                  {size.label}
                </Button>
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box>
            <Typography variant="h6" gutterBottom>
              アイコン付きボタン
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant={buttonInfo.variant}
                startIcon={<span>🚀</span>}
              >
                Start Icon
              </Button>
              <Button
                variant={buttonInfo.variant}
                endIcon={<span>✨</span>}
              >
                End Icon
              </Button>
            </Box>
          </Box>
        </Paper>
      ))}

      <Paper elevation={1} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          全バリアント比較
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          すべてのボタンバリアントを並べて比較できます。
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {buttonVariants.map((buttonInfo) => (
            <Button
              key={buttonInfo.variant}
              variant={buttonInfo.variant}
            >
              {buttonInfo.title}
            </Button>
          ))}
        </Box>
      </Paper>

      <Paper elevation={1} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          使用ガイドライン
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" paragraph>
            <strong>Filled Button:</strong> 最も重要なアクション（送信、保存、購入など）
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Elevated Button:</strong> 重要だが、Filledほどではないアクション
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Tonal Button:</strong> 中程度の重要度のアクション
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Outlined Button:</strong> セカンダリアクション（キャンセル、戻るなど）
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Text Button:</strong> 最も控えめなアクション（詳細表示、ヘルプなど）
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ButtonsPage; 