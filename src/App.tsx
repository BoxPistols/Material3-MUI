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
                sx={{ p: 4, minHeight: '100vh' }}
            >
                <Box>
                    <Typography variant='h1' gutterBottom>
                        Material Design 3 + MUI
                    </Typography>
                    <Typography variant='body1' paragraph>
                        テストページが正常に表示されています。
                    </Typography>
                </Box>
                <Box display='flex' gap={2}>
                    <Button variant='filled'>Filled Button</Button>
                    <Button variant='outlined'>Outlined Button</Button>
                    <Button variant='text'>Text Button</Button>
                </Box>
                <Box display='flex' gap={2}>
                    <Button variant='elevated'>Elevated Button</Button>
                    <Button variant='filled'>Filled Button</Button>
                    <Button variant='tonal'>Tonal Button</Button>
                    <Button variant='outlined'>Outlined Button</Button>
                    <Button variant='text'>Text Button</Button>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default App
