import React, { useState } from 'react'
import {
  Box,
  Typography,
  Container,
  Paper,
  Chip,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from '@mui/material'
import {
  Download as DownloadIcon,
  Upload as UploadIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material'
import { useTheme } from '../contexts/ThemeContext'
import { designTokens } from '../tokens/designTokens'
import {
  downloadTokensAsJSON,
  exportAsCSS,
  exportAsSCSS,
  importTokensFromFile,
  extractColorScheme,
} from '../utils/figmaTokens'
import { generateColorsFromPrimary } from '../theme'

const TokensPage: React.FC = () => {
  const { mode, primaryColor, useOriginalColor, designVersion, setDesignVersion, setPrimaryColor } = useTheme()
  const [exportFormat, setExportFormat] = useState<'json' | 'css' | 'scss'>('json')
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // 現在のカラースキームを取得
  const currentColors = generateColorsFromPrimary(primaryColor, useOriginalColor)[mode]

  const handleExport = () => {
    if (exportFormat === 'json') {
      downloadTokensAsJSON(currentColors, mode, `design-tokens-${mode}.json`)
    } else if (exportFormat === 'css') {
      const css = exportAsCSS(currentColors, mode)
      const blob = new Blob([css], { type: 'text/css' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `design-tokens-${mode}.css`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } else {
      const scss = exportAsSCSS(currentColors, mode)
      const blob = new Blob([scss], { type: 'text/scss' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `design-tokens-${mode}.scss`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const tokens = await importTokensFromFile(file)
      const colorScheme = extractColorScheme(tokens)

      if (Object.keys(colorScheme).length > 0 && colorScheme.primary) {
        setPrimaryColor(colorScheme.primary)
        setImportStatus({ type: 'success', message: `トークンをインポートしました: ${Object.keys(colorScheme).length} 色` })
      } else {
        setImportStatus({ type: 'error', message: 'カラートークンが見つかりませんでした' })
      }
    } catch (error) {
      setImportStatus({ type: 'error', message: `インポートエラー: ${(error as Error).message}` })
    }

    // Reset file input
    event.target.value = ''
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          デザイントークン管理
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Material Design 3のデザイントークンとFigma互換のエクスポート/インポート機能
        </Typography>
      </Box>

      {/* デザインバージョン切り替え */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          デザインシステムバージョン
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <ToggleButtonGroup
            value={designVersion}
            exclusive
            onChange={(_, value) => value && setDesignVersion(value)}
            aria-label="design version"
          >
            <ToggleButton value="md3" aria-label="material design 3">
              Material Design 3
            </ToggleButton>
            <ToggleButton value="md2" aria-label="material design 2">
              Material Design 2
            </ToggleButton>
          </ToggleButtonGroup>
          <Chip
            label={designVersion === 'md3' ? 'Material You対応' : 'レガシー'}
            color={designVersion === 'md3' ? 'primary' : 'default'}
            size="small"
          />
        </Stack>
      </Paper>

      {/* エクスポート/インポート */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          トークンのエクスポート/インポート
        </Typography>

        {importStatus && (
          <Alert severity={importStatus.type} sx={{ mb: 2 }} onClose={() => setImportStatus(null)}>
            {importStatus.message}
          </Alert>
        )}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-start">
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              エクスポート形式
            </Typography>
            <ToggleButtonGroup
              value={exportFormat}
              exclusive
              onChange={(_, value) => value && setExportFormat(value)}
              size="small"
            >
              <ToggleButton value="json">JSON</ToggleButton>
              <ToggleButton value="css">CSS</ToggleButton>
              <ToggleButton value="scss">SCSS</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
          >
            エクスポート
          </Button>

          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadIcon />}
          >
            インポート
            <input
              type="file"
              hidden
              accept=".json"
              onChange={handleImport}
            />
          </Button>
        </Stack>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* スペーシングトークン */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          スペーシング
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {Object.entries(designTokens.spacing).map(([key, value]) => (
            <Box key={key} sx={{ flex: '1 1 calc(33.333% - 16px)', minWidth: '280px' }}>
              <Card>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {key}
                      </Typography>
                      <Typography variant="h6">{value}</Typography>
                    </Box>
                    <Box
                      sx={{
                        width: value,
                        height: '24px',
                        backgroundColor: 'primary.main',
                        borderRadius: 1,
                      }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Elevationトークン */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Elevation
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {Object.entries(designTokens.elevation).map(([key, value]) => (
            <Box key={key} sx={{ flex: '1 1 calc(33.333% - 16px)', minWidth: '280px' }}>
              <Paper
                sx={{
                  p: 3,
                  height: 120,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: value,
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  {key}
                </Typography>
                <Tooltip title="コピー">
                  <IconButton
                    size="small"
                    onClick={() => copyToClipboard(value)}
                    sx={{ alignSelf: 'flex-end' }}
                  >
                    <CopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Paper>
            </Box>
          ))}
        </Box>
      </Box>

      {/* コーナー（角丸）トークン */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Corner Radius
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {Object.entries(designTokens.corner).map(([key, value]) => (
            <Box key={key} sx={{ flex: '1 1 calc(33.333% - 16px)', minWidth: '280px' }}>
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {key}
                      </Typography>
                      <Typography variant="h6">{value}</Typography>
                    </Box>
                    <Box
                      sx={{
                        width: '100%',
                        height: 60,
                        backgroundColor: 'primary.main',
                        borderRadius: value,
                      }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      {/* アニメーションデュレーション */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Animation Duration
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {Object.entries(designTokens.animation.duration).map(([key, value]) => (
            <Box key={key} sx={{ flex: '1 1 calc(25% - 16px)', minWidth: '200px' }}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    {key}
                  </Typography>
                  <Typography variant="h6">{value}</Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      {/* アニメーションイージング */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Animation Easing
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {Object.entries(designTokens.animation.easing).map(([key, value]) => (
            <Box key={key} sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '300px' }}>
              <Card>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {key}
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                        {value}
                      </Typography>
                    </Box>
                    <Tooltip title="コピー">
                      <IconButton size="small" onClick={() => copyToClipboard(value)}>
                        <CopyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ステートレイヤー */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          State Layer Opacity
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {Object.entries(designTokens.stateLayer).map(([key, value]) => (
            <Box key={key} sx={{ flex: '1 1 calc(25% - 16px)', minWidth: '200px' }}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    {key}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {value.opacity}
                  </Typography>
                  <Box
                    sx={{
                      width: '100%',
                      height: 40,
                      backgroundColor: 'primary.main',
                      position: 'relative',
                      borderRadius: 1,
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'background.paper',
                        opacity: 1 - value.opacity,
                        borderRadius: 1,
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      {/* カラーパレット（現在のテーマ） */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          カラーパレット（現在のテーマ: {mode}）
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {Object.entries(currentColors).map(([key, value]) => (
            <Box key={key} sx={{ flex: '1 1 calc(33.333% - 16px)', minWidth: '280px' }}>
              <Card>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        backgroundColor: value,
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2">{key}</Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
                      >
                        {value}
                      </Typography>
                    </Box>
                    <Tooltip title="コピー">
                      <IconButton size="small" onClick={() => copyToClipboard(value)}>
                        <CopyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  )
}

export default TokensPage
