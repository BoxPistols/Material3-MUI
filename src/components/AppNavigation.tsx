import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from '@tanstack/react-router';

const AppNavigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'ホーム' },
    { path: '/colors', label: 'カラー' },
    { path: '/buttons', label: 'ボタン' },
    { path: '/components', label: 'コンポーネント' },
    { path: '/typography', label: 'タイポグラフィ' },
  ];

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Material Design 3 + MUI 7
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              color="inherit"
              variant={location.pathname === item.path ? 'outlined' : 'text'}
              sx={{
                borderColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavigation; 