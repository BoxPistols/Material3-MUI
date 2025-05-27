import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { Box, Button } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          p: 6,
          display: 'flex',
          gap: 4,
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
        }}
      >
        <Button variant="elevated">Elevated Button</Button>
        <Button variant="filled">Filled Button</Button>
        <Button variant="tonal">Tonal Button</Button>
        <Button variant="outlined">Outlined Button</Button>
        <Button variant="text">Text Button</Button>
      </Box>
    </ThemeProvider>
  );
}

export default App;
