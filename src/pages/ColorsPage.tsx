import { Box, Typography, Paper, Chip, Switch, FormControlLabel, Grid } from '@mui/material';
import { useState } from 'react';
import { materialColors } from '../theme';

interface ColorCardProps {
  name: string;
  color: string;
  textColor?: string;
}

const ColorCard: React.FC<ColorCardProps> = ({ name, color, textColor = '#000' }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        backgroundColor: color,
        color: textColor,
        minHeight: 120,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
        {name}
      </Typography>
      <Chip
        label={color.toUpperCase()}
        size="small"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: '#000',
          fontSize: '0.75rem',
          alignSelf: 'flex-start',
        }}
      />
    </Paper>
  );
};

const ColorsPage: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const currentColors = isDark ? materialColors.dark : materialColors.light;

  const colorGroups = [
    {
      title: 'Primary Colors',
      colors: [
        { name: 'Primary', key: 'primary' },
        { name: 'On Primary', key: 'onPrimary' },
        { name: 'Primary Container', key: 'primaryContainer' },
        { name: 'On Primary Container', key: 'onPrimaryContainer' },
      ]
    },
    {
      title: 'Secondary Colors',
      colors: [
        { name: 'Secondary', key: 'secondary' },
        { name: 'On Secondary', key: 'onSecondary' },
        { name: 'Secondary Container', key: 'secondaryContainer' },
        { name: 'On Secondary Container', key: 'onSecondaryContainer' },
      ]
    },
    {
      title: 'Tertiary Colors',
      colors: [
        { name: 'Tertiary', key: 'tertiary' },
        { name: 'On Tertiary', key: 'onTertiary' },
        { name: 'Tertiary Container', key: 'tertiaryContainer' },
        { name: 'On Tertiary Container', key: 'onTertiaryContainer' },
      ]
    },
    {
      title: 'Error Colors',
      colors: [
        { name: 'Error', key: 'error' },
        { name: 'On Error', key: 'onError' },
        { name: 'Error Container', key: 'errorContainer' },
        { name: 'On Error Container', key: 'onErrorContainer' },
      ]
    },
    {
      title: 'Surface Colors',
      colors: [
        { name: 'Background', key: 'background' },
        { name: 'On Background', key: 'onBackground' },
        { name: 'Surface', key: 'surface' },
        { name: 'On Surface', key: 'onSurface' },
        { name: 'Surface Variant', key: 'surfaceVariant' },
        { name: 'On Surface Variant', key: 'onSurfaceVariant' },
      ]
    },
    {
      title: 'Outline Colors',
      colors: [
        { name: 'Outline', key: 'outline' },
        { name: 'Outline Variant', key: 'outlineVariant' },
      ]
    },
    {
      title: 'Other Colors',
      colors: [
        { name: 'Shadow', key: 'shadow' },
        { name: 'Scrim', key: 'scrim' },
        { name: 'Inverse Surface', key: 'inverseSurface' },
        { name: 'Inverse On Surface', key: 'inverseOnSurface' },
        { name: 'Inverse Primary', key: 'inversePrimary' },
      ]
    },
  ];

  const getTextColor = (colorKey: string): string => {
    // "on" で始まるカラーは通常テキスト用なので、背景色に応じて調整
    if (colorKey.startsWith('on')) {
      return isDark ? '#000' : '#fff';
    }
    // その他のカラーは対応する "on" カラーを使用
    const onColorKey = `on${colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}` as keyof typeof currentColors;
    return currentColors[onColorKey] || (isDark ? '#fff' : '#000');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          🎨 Material Design 3 カラーパレット
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={isDark}
              onChange={(e) => setIsDark(e.target.checked)}
            />
          }
          label={isDark ? 'ダークテーマ' : 'ライトテーマ'}
        />
      </Box>

      <Typography variant="body1" paragraph>
        Material Design 3の完全なカラーシステムです。各カラートークンは、
        アクセシビリティとユーザビリティを考慮して設計されています。
      </Typography>

      {colorGroups.map((group) => (
        <Box key={group.title} sx={{ mb: 6 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            {group.title}
          </Typography>
          <Grid container spacing={2}>
            {group.colors.map((colorInfo) => {
              const colorValue = currentColors[colorInfo.key as keyof typeof currentColors];
              const textColor = getTextColor(colorInfo.key);
              
              return (
                <Grid key={colorInfo.key} size={{ xs: 12, sm: 6, md: 3 }}>
                  <ColorCard
                    name={colorInfo.name}
                    color={colorValue}
                    textColor={textColor}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default ColorsPage; 