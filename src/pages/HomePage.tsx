import { Box, Typography, Card, CardContent, Grid } from '@mui/material'
import { Dashboard, ColorLens, SmartButton, Widgets, TextFields } from '@mui/icons-material'
import { Link } from '@tanstack/react-router'

const HomePage: React.FC = () => {
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant='h2' gutterBottom>
                Material Design 3 + MUI 7
            </Typography>
            <Typography variant='body1' paragraph>
                このアプリケーションは、MUI v7を拡張してMaterial Design
                3のデザインシステムを実装したデモです。
            </Typography>

            <Grid container spacing={3} sx={{ mt: 4 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card
                        component={Link}
                        to='/dashboard'
                        sx={{ textDecoration: 'none', height: '100%' }}
                    >
                        <CardContent>
                            <Typography variant='h5' gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Dashboard /> SaaS Dashboard
                            </Typography>
                            <Typography variant='body2'>
                                モックのAdmin画面とダッシュボードです。
                                統計カード、データテーブル、チャートエリアなど、
                                実際のSaaSアプリケーションで使用される要素を含んでいます。
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Card
                        component={Link}
                        to='/colors'
                        sx={{ textDecoration: 'none', height: '100%' }}
                    >
                        <CardContent>
                            <Typography variant='h5' gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ColorLens /> カラーパレット
                            </Typography>
                            <Typography variant='body2'>
                                Material Design
                                3の完全なカラーシステムを確認できます。
                                ライトテーマとダークテーマの両方のカラートークンを表示します。
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Card
                        component={Link}
                        to='/buttons'
                        sx={{ textDecoration: 'none', height: '100%' }}
                    >
                        <CardContent>
                            <Typography variant='h5' gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <SmartButton /> ボタンバリアント
                            </Typography>
                            <Typography variant='body2'>
                                Material Design
                                3の新しいボタンバリアント（filled、elevated、tonal）を
                                含む全てのボタンスタイルを確認できます。
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Card
                        component={Link}
                        to='/components'
                        sx={{ textDecoration: 'none', height: '100%' }}
                    >
                        <CardContent>
                            <Typography variant='h5' gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Widgets /> コンポーネント
                            </Typography>
                            <Typography variant='body2'>
                                MUIの各コンポーネントがMaterial Design
                                3テーマでどのように 表示されるかを確認できます。
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Card
                        component={Link}
                        to='/typography'
                        sx={{ textDecoration: 'none', height: '100%' }}
                    >
                        <CardContent>
                            <Typography variant='h5' gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TextFields /> タイポグラフィ
                            </Typography>
                            <Typography variant='body2'>
                                Material Design 3のタイポグラフィスケールと
                                MUIのTypographyコンポーネントの統合を確認できます。
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default HomePage
