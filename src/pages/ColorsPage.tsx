import { Box, Typography, Paper, Chip } from '@mui/material'
import { Grid } from '@mui/material'
import { ColorLens, GpsFixed } from '@mui/icons-material'
import { generateColorsFromPrimary } from '../theme'
import { useTheme } from '../contexts/ThemeContext'
import { useMemo } from 'react'

interface ColorCardProps {
    name: string
    color: string
    textColor?: string
}

const ColorCard: React.FC<ColorCardProps> = ({
    name,
    color,
    textColor = '#000',
}) => {
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
            <Typography variant='body2' sx={{ fontWeight: 'bold', mb: 1 }}>
                {name}
            </Typography>
            <Chip
                label={color.toUpperCase()}
                size='small'
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: '#000',
                    fontSize: '0.75rem',
                    alignSelf: 'flex-start',
                }}
            />
        </Paper>
    )
}

const ColorsPage: React.FC = () => {
    const { mode, primaryColor, useOriginalColor } = useTheme()
    const currentColors = useMemo(() => generateColorsFromPrimary(primaryColor, useOriginalColor)[mode], [primaryColor, useOriginalColor, mode])

    const colorGroups = [
        {
            title: 'Primary Colors',
            colors: [
                { name: 'Primary', key: 'primary' },
                { name: 'On Primary', key: 'onPrimary' },
                { name: 'Primary Container', key: 'primaryContainer' },
                { name: 'On Primary Container', key: 'onPrimaryContainer' },
            ],
        },
        {
            title: 'Secondary Colors',
            colors: [
                { name: 'Secondary', key: 'secondary' },
                { name: 'On Secondary', key: 'onSecondary' },
                { name: 'Secondary Container', key: 'secondaryContainer' },
                { name: 'On Secondary Container', key: 'onSecondaryContainer' },
            ],
        },
        {
            title: 'Tertiary Colors',
            colors: [
                { name: 'Tertiary', key: 'tertiary' },
                { name: 'On Tertiary', key: 'onTertiary' },
                { name: 'Tertiary Container', key: 'tertiaryContainer' },
                { name: 'On Tertiary Container', key: 'onTertiaryContainer' },
            ],
        },
        {
            title: 'Error Colors',
            colors: [
                { name: 'Error', key: 'error' },
                { name: 'On Error', key: 'onError' },
                { name: 'Error Container', key: 'errorContainer' },
                { name: 'On Error Container', key: 'onErrorContainer' },
            ],
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
            ],
        },
        {
            title: 'Outline Colors',
            colors: [
                { name: 'Outline', key: 'outline' },
                { name: 'Outline Variant', key: 'outlineVariant' },
            ],
        },
        {
            title: 'Other Colors',
            colors: [
                { name: 'Shadow', key: 'shadow' },
                { name: 'Scrim', key: 'scrim' },
                { name: 'Inverse Surface', key: 'inverseSurface' },
                { name: 'Inverse On Surface', key: 'inverseOnSurface' },
                { name: 'Inverse Primary', key: 'inversePrimary' },
            ],
        },
    ]

    const getTextColor = (colorKey: string): string => {
        // "on" で始まるカラーは通常テキスト用なので、背景色に応じて調整
        if (colorKey.startsWith('on')) {
            return mode === 'dark' ? '#000' : '#fff'
        }
        // その他のカラーは対応する "on" カラーを使用
        const onColorKey =
            `on${colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}` as keyof typeof currentColors
        return currentColors[onColorKey] || (mode === 'dark' ? '#fff' : '#000')
    }

    return (
        <Box sx={{ p: 4 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4,
                }}
            >
                <Typography variant='h3' gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ColorLens /> Material Design 3 カラーパレット
                </Typography>
                <Box sx={{ textAlign: 'right' }}>
                    <Typography variant='body2' color='text.secondary'>
                        現在のテーマ: {mode === 'dark' ? 'ダーク' : 'ライト'}
                        モード
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        プライマリカラー: {primaryColor}
                    </Typography>
                </Box>
            </Box>

            <Typography variant='body1' paragraph>
                Material Color Utilitiesを使用して、プライマリカラー（
                {primaryColor}）から自動生成された
                完全なカラーシステムです。各カラートークンは、アクセシビリティとユーザビリティを
                考慮して設計されています。
            </Typography>

            <Paper
                elevation={1}
                sx={{
                    p: 3,
                    mb: 4,
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                }}
            >
                <Typography variant='h6' gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <GpsFixed /> 動的カラー生成
                </Typography>
                <Typography variant='body2'>
                    このカラーパレットは、Material Color
                    Utilitiesライブラリを使用して、
                    選択されたプライマリカラーから自動的に生成されています。
                    ナビゲーションバーのパレットアイコンから、リアルタイムでカラーを変更できます。
                    ライトモードとダークモードの両方で最適なコントラストと調和を保ちます。
                </Typography>
                
                {/* プライマリカラー詳細情報 */}
                <Box sx={{ mt: 2, p: 2, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
                    <Typography variant='subtitle2' gutterBottom>
                        現在のプライマリカラー詳細:
                    </Typography>
                    <Typography variant='body2' component='div'>
                        • HEX: {primaryColor}<br/>
                        • RGB: {(() => {
                            const r = parseInt(primaryColor.slice(1, 3), 16);
                            const g = parseInt(primaryColor.slice(3, 5), 16);
                            const b = parseInt(primaryColor.slice(5, 7), 16);
                            return `rgb(${r}, ${g}, ${b})`;
                        })()}<br/>
                        • オリジナル色保持: {useOriginalColor ? 'ON' : 'OFF'}<br/>
                        • 生成されたプライマリ: {currentColors.primary}
                    </Typography>
                </Box>
            </Paper>

            {colorGroups.map((group) => (
                <Box key={group.title} sx={{ mb: 6 }}>
                    <Typography variant='h5' gutterBottom sx={{ mb: 3 }}>
                        {group.title}
                    </Typography>
                    <Grid container spacing={2}>
                        {group.colors.map((colorInfo) => {
                            const colorValue =
                                currentColors[
                                    colorInfo.key as keyof typeof currentColors
                                ]
                            const textColor = getTextColor(colorInfo.key)

                            return (
                                <Grid
                                    key={colorInfo.key}
                                    size={{ xs: 12, sm: 6, md: 3 }}
                                >
                                    <ColorCard
                                        name={colorInfo.name}
                                        color={colorValue}
                                        textColor={textColor}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
            ))}
        </Box>
    )
}

export default ColorsPage
