import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'
import { Box, Typography, Button } from '@mui/material'

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Box
                display='flex'
                flexDirection='column'
                gap={4}
                sx={{ p: 16, minHeight: '100vh' }}
            >
                <Box>
                    <Typography variant='h2' gutterBottom>
                        Material Design 3 + MUI
                    </Typography>
                    <Typography variant='body1' paragraph>
                        テストページが正常に表示されています。
                    </Typography>
                </Box>
                <Box display='flex' gap={2}>
                    <Typography variant='h4'>MUIの標準ボタン</Typography>
                    {/* デフォルトボタン */}
                    <Button variant='contained'>Contained Button</Button>
                    <Button variant='outlined'>Outlined Button</Button>
                    <Button variant='text'>Text Button</Button>
                </Box>
                <Box display='flex' gap={2}>
                    <Typography variant='h4'>
                        Material Design 3のボタン
                    </Typography>
                    {/* これはMaterial Design 3のボタンとして拡張 */}
                    <Button variant='filled'>Filled Button</Button>
                    <Button variant='elevated'>Elevated Button</Button>
                    <Button variant='tonal'>Tonal Button</Button>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default App
