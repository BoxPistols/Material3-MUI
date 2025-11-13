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
  Dashboard,
  Token
} from '@mui/icons-material';
import { Link, useLocation } from '@tanstack/react-router';
import { useTheme } from '../contexts/ThemeContext';
import { useState, useMemo, type ComponentType } from 'react';
import AdvancedColorPicker from './AdvancedColorPicker';

// ナビゲーション項目の型定義
interface NavItem {
  path: string;
  label: string;
  icon: ComponentType;
}

// ナビゲーション項目をコンポーネント外で定義（再レンダリング時の再生成を防止）
const NAV_ITEMS: readonly NavItem[] = [
  { path: '/', label: 'ホーム', icon: Home },
  { path: '/dashboard', label: 'ダッシュボード', icon: Dashboard },
  { path: '/colors', label: 'カラー', icon: ColorLens },
  { path: '/tokens', label: 'トークン', icon: Token },
  { path: '/buttons', label: 'ボタン', icon: SmartButton },
  { path: '/components', label: 'コンポーネント', icon: Widgets },
  { path: '/typography', label: 'タイポグラフィ', icon: TextFields },
] as const;

const AppNavigation: React.FC = () => {
  const location = useLocation();
  const { mode, toggleMode, primaryColor, setPrimaryColor } = useTheme();
  const [colorPickerAnchor, setColorPickerAnchor] = useState<HTMLButtonElement | null>(null);

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

  // 現在のパスが一致するかチェック（メモ化）
  const isActive = useMemo(() => {
    return (path: string) => location.pathname === path;
  }, [location.pathname]);

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Material Design 3 + MUI 7
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {NAV_ITEMS.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.path);
            return (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                color="inherit"
                variant={active ? 'outlined' : 'text'}
                startIcon={<IconComponent />}
                aria-current={active ? 'page' : undefined}
                sx={{
                  borderColor: active ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
                  display: { xs: 'none', md: 'flex' }, // モバイルでは非表示
                }}
              >
                {item.label}
              </Button>
            );
          })}

          {/* モバイル用のアイコンのみナビゲーション */}
          <Box
            sx={{ display: { xs: 'flex', md: 'none' }, gap: 0.5 }}
            component="nav"
            aria-label="メインナビゲーション"
          >
            {NAV_ITEMS.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.path);
              return (
                <Tooltip key={item.path} title={item.label}>
                  <IconButton
                    component={Link}
                    to={item.path}
                    color="inherit"
                    size="small"
                    aria-label={item.label}
                    aria-current={active ? 'page' : undefined}
                    sx={{
                      backgroundColor: active ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    }}
                  >
                    <IconComponent sx={{ fontSize: 'small' }} />
                  </IconButton>
                </Tooltip>
              );
            })}
          </Box>

          {/* カラーピッカーボタン */}
          <Tooltip title="プライマリカラーを変更">
            <IconButton
              id="color-picker-button"
              onClick={handleColorPickerOpen}
              color="inherit"
              aria-label="プライマリカラーを変更"
              aria-haspopup="dialog"
              aria-expanded={isColorPickerOpen}
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
          aria-labelledby="color-picker-button"
        >
          {/* 条件付きレンダリング：開いている時のみマウント */}
          {isColorPickerOpen && (
            <AdvancedColorPicker
              value={primaryColor}
              onChange={handleColorChange}
            />
          )}
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavigation; 