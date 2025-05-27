import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Tooltip,
  Popover,
  Paper,
  TextField
} from '@mui/material';
import { 
  DarkMode, 
  LightMode, 
  Palette,
  Home,
  ColorLens,
  SmartButton,
  Widgets,
  TextFields
} from '@mui/icons-material';
import { Link, useLocation } from '@tanstack/react-router';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';

const AppNavigation: React.FC = () => {
  const location = useLocation();
  const { mode, toggleMode, primaryColor, setPrimaryColor } = useTheme();
  const [colorPickerAnchor, setColorPickerAnchor] = useState<HTMLButtonElement | null>(null);

  const navItems = [
    { path: '/', label: 'ホーム', icon: Home },
    { path: '/colors', label: 'カラー', icon: ColorLens },
    { path: '/buttons', label: 'ボタン', icon: SmartButton },
    { path: '/components', label: 'コンポーネント', icon: Widgets },
    { path: '/typography', label: 'タイポグラフィ', icon: TextFields },
  ];

  const handleColorPickerOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setColorPickerAnchor(event.currentTarget);
  };

  const handleColorPickerClose = () => {
    setColorPickerAnchor(null);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrimaryColor(event.target.value);
  };

  const isColorPickerOpen = Boolean(colorPickerAnchor);

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Material Design 3 + MUI 7
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                color="inherit"
                variant={location.pathname === item.path ? 'outlined' : 'text'}
                startIcon={<IconComponent />}
                sx={{
                  borderColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
                  display: { xs: 'none', md: 'flex' }, // モバイルでは非表示
                }}
              >
                {item.label}
              </Button>
            );
          })}
          
          {/* モバイル用のアイコンのみナビゲーション */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 0.5 }}>
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Tooltip key={item.path} title={item.label}>
                  <IconButton
                    component={Link}
                    to={item.path}
                    color="inherit"
                    size="small"
                    sx={{
                      backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    }}
                  >
                    <IconComponent fontSize="small" />
                  </IconButton>
                </Tooltip>
              );
            })}
          </Box>

          {/* カラーピッカーボタン */}
          <Tooltip title="プライマリカラーを変更">
            <IconButton
              onClick={handleColorPickerOpen}
              color="inherit"
              sx={{ ml: 1 }}
            >
              <Palette />
            </IconButton>
          </Tooltip>

          {/* ダークモード切り替えボタン */}
          <Tooltip title={`${mode === 'light' ? 'ダーク' : 'ライト'}モードに切り替え`}>
            <IconButton
              onClick={toggleMode}
              color="inherit"
              sx={{ ml: 1 }}
            >
              {mode === 'light' ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Tooltip>
        </Box>

        {/* カラーピッカーポップオーバー */}
        <Popover
          open={isColorPickerOpen}
          anchorEl={colorPickerAnchor}
          onClose={handleColorPickerClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Paper sx={{ p: 3, minWidth: 300 }}>
            <Typography variant="h6" gutterBottom>
              プライマリカラーを選択
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <TextField
                type="color"
                value={primaryColor}
                onChange={handleColorChange}
                sx={{ width: 60 }}
                InputProps={{
                  sx: { height: 40 }
                }}
              />
              <TextField
                label="HEXカラー"
                value={primaryColor}
                onChange={handleColorChange}
                size="small"
                sx={{ flexGrow: 1 }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              選択したカラーから Material Design 3 の完全なカラーパレットが自動生成されます。
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
              {[
                '#65558F', // Material Purple
                '#1976D2', // Blue
                '#388E3C', // Green
                '#F57C00', // Orange
                '#D32F2F', // Red
                '#7B1FA2', // Purple
                '#0097A7', // Cyan
                '#5D4037', // Brown
              ].map((color) => (
                <Box
                  key={color}
                  onClick={() => setPrimaryColor(color)}
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: color,
                    borderRadius: 1,
                    cursor: 'pointer',
                    border: primaryColor === color ? '2px solid white' : '1px solid rgba(0,0,0,0.1)',
                    boxShadow: primaryColor === color ? '0 0 0 2px currentColor' : 'none',
                  }}
                />
              ))}
            </Box>
          </Paper>
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavigation; 