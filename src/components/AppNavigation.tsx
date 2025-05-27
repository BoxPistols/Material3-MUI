import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Tooltip,
  Popover
} from '@mui/material';
import { 
  DarkMode, 
  LightMode, 
  Palette,
  Home,
  ColorLens,
  SmartButton,
  Widgets,
  TextFields,
  Dashboard
} from '@mui/icons-material';
import { Link, useLocation } from '@tanstack/react-router';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';
import AdvancedColorPicker from './AdvancedColorPicker';

const AppNavigation: React.FC = () => {
  const location = useLocation();
  const { mode, toggleMode, primaryColor, setPrimaryColor } = useTheme();
  const [colorPickerAnchor, setColorPickerAnchor] = useState<HTMLButtonElement | null>(null);

  const navItems = [
    { path: '/', label: 'ホーム', icon: Home },
    { path: '/dashboard', label: 'ダッシュボード', icon: Dashboard },
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

  const handleColorChange = (newColor: string) => {
    setPrimaryColor(newColor);
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

        {/* 高度なカラーピッカーポップオーバー */}
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
          <AdvancedColorPicker
            value={primaryColor}
            onChange={handleColorChange}
          />
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavigation; 