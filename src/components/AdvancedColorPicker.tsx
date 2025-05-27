import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Slider,
  Paper,
  Grid,
  InputAdornment,
  Chip,
  Divider
} from '@mui/material';
import { Colorize } from '@mui/icons-material';
import { converter, formatHex, oklch, rgb } from 'culori';

interface AdvancedColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const AdvancedColorPicker: React.FC<AdvancedColorPickerProps> = ({
  value,
  onChange
}) => {
  // OkLCH色空間での状態管理
  const [oklchValues, setOklchValues] = useState({ l: 0.5, c: 0.1, h: 250 });
  const [hexInput, setHexInput] = useState(value);
  const [rgbValues, setRgbValues] = useState({ r: 0, g: 0, b: 0 });

  // HEXからOkLCHに変換
  const hexToOklch = useCallback((hex: string) => {
    try {
      const color = converter('oklch')(hex);
      if (color) {
        return {
          l: color.l || 0.5,
          c: color.c || 0.1,
          h: color.h || 250
        };
      }
    } catch (error) {
      console.warn('Color conversion error:', error);
    }
    return { l: 0.5, c: 0.1, h: 250 };
  }, []);

  // OkLCHからHEXに変換
  const oklchToHex = useCallback((l: number, c: number, h: number) => {
    try {
      const color = oklch({ l, c, h });
      return formatHex(color) || '#000000';
    } catch (error) {
      console.warn('Color conversion error:', error);
      return '#000000';
    }
  }, []);

  // HEXからRGBに変換
  const hexToRgb = useCallback((hex: string) => {
    try {
      const color = converter('rgb')(hex);
      if (color) {
        return {
          r: Math.round((color.r || 0) * 255),
          g: Math.round((color.g || 0) * 255),
          b: Math.round((color.b || 0) * 255)
        };
      }
    } catch (error) {
      console.warn('RGB conversion error:', error);
    }
    return { r: 0, g: 0, b: 0 };
  }, []);

  // 初期化とvalue変更時の更新
  useEffect(() => {
    const oklchColor = hexToOklch(value);
    const rgbColor = hexToRgb(value);
    setOklchValues(oklchColor);
    setRgbValues(rgbColor);
    setHexInput(value);
  }, [value, hexToOklch, hexToRgb]);

  // OkLCH値変更ハンドラー
  const handleOklchChange = useCallback((key: 'l' | 'c' | 'h', newValue: number) => {
    const newOklch = { ...oklchValues, [key]: newValue };
    setOklchValues(newOklch);
    
    const newHex = oklchToHex(newOklch.l, newOklch.c, newOklch.h);
    const newRgb = hexToRgb(newHex);
    
    setHexInput(newHex);
    setRgbValues(newRgb);
    onChange(newHex);
  }, [oklchValues, oklchToHex, hexToRgb, onChange]);

  // RGB値変更ハンドラー
  const handleRgbChange = useCallback((key: 'r' | 'g' | 'b', newValue: number) => {
    const newRgb = { ...rgbValues, [key]: Math.max(0, Math.min(255, newValue)) };
    setRgbValues(newRgb);
    
    const rgbColor = rgb({ r: newRgb.r / 255, g: newRgb.g / 255, b: newRgb.b / 255 });
    const newHex = formatHex(rgbColor) || '#000000';
    const newOklch = hexToOklch(newHex);
    
    setHexInput(newHex);
    setOklchValues(newOklch);
    onChange(newHex);
  }, [rgbValues, hexToOklch, onChange]);

  // HEX入力変更ハンドラー
  const handleHexChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = event.target.value;
    setHexInput(newHex);
    
    if (/^#[0-9A-Fa-f]{6}$/.test(newHex)) {
      const newOklch = hexToOklch(newHex);
      const newRgb = hexToRgb(newHex);
      
      setOklchValues(newOklch);
      setRgbValues(newRgb);
      onChange(newHex);
    }
  }, [hexToOklch, hexToRgb, onChange]);

  // プリセットカラー
  const presetColors = [
    '#65558F', // Material Purple
    '#1976D2', // Blue
    '#388E3C', // Green
    '#F57C00', // Orange
    '#D32F2F', // Red
    '#7B1FA2', // Purple
    '#0097A7', // Cyan
    '#5D4037', // Brown
    '#000000', // Black
    '#FFFFFF', // White
    '#FF5722', // Deep Orange
    '#9C27B0', // Purple
  ];

  const currentColor = oklchToHex(oklchValues.l, oklchValues.c, oklchValues.h);

  return (
    <Paper sx={{ p: 3, minWidth: 400, maxWidth: 500 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Colorize /> 高度なカラーピッカー
      </Typography>

      {/* カラープレビュー */}
      <Box
        sx={{
          width: '100%',
          height: 80,
          backgroundColor: currentColor,
          borderRadius: 2,
          mb: 3,
          border: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Chip
          label={currentColor.toUpperCase()}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#000',
            fontWeight: 'bold'
          }}
        />
      </Box>

      {/* HEX入力 */}
      <TextField
        label="HEXカラー"
        value={hexInput}
        onChange={handleHexChange}
        fullWidth
        size="small"
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: <InputAdornment position="start">#</InputAdornment>,
        }}
      />

      <Divider sx={{ mb: 3 }} />

      {/* OkLCH調整 */}
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
        OkLCH色空間調整
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Lightness */}
        <Grid size={12}>
          <Typography variant="body2" gutterBottom>
            明度 (L): {(oklchValues.l * 100).toFixed(1)}%
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Slider
              value={oklchValues.l}
              onChange={(_, value) => handleOklchChange('l', value as number)}
              min={0}
              max={1}
              step={0.01}
              sx={{ flexGrow: 1 }}
            />
            <TextField
              type="number"
              value={(oklchValues.l * 100).toFixed(1)}
              onChange={(e) => handleOklchChange('l', parseFloat(e.target.value) / 100)}
              size="small"
              sx={{ width: 80 }}
              inputProps={{ min: 0, max: 100, step: 0.1 }}
            />
          </Box>
        </Grid>

        {/* Chroma */}
        <Grid size={12}>
          <Typography variant="body2" gutterBottom>
            彩度 (C): {(oklchValues.c * 100).toFixed(1)}%
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Slider
              value={oklchValues.c}
              onChange={(_, value) => handleOklchChange('c', value as number)}
              min={0}
              max={0.4}
              step={0.01}
              sx={{ flexGrow: 1 }}
            />
            <TextField
              type="number"
              value={(oklchValues.c * 100).toFixed(1)}
              onChange={(e) => handleOklchChange('c', parseFloat(e.target.value) / 100)}
              size="small"
              sx={{ width: 80 }}
              inputProps={{ min: 0, max: 40, step: 0.1 }}
            />
          </Box>
        </Grid>

        {/* Hue */}
        <Grid size={12}>
          <Typography variant="body2" gutterBottom>
            色相 (H): {oklchValues.h.toFixed(0)}°
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Slider
              value={oklchValues.h}
              onChange={(_, value) => handleOklchChange('h', value as number)}
              min={0}
              max={360}
              step={1}
              sx={{ flexGrow: 1 }}
            />
            <TextField
              type="number"
              value={oklchValues.h.toFixed(0)}
              onChange={(e) => handleOklchChange('h', parseFloat(e.target.value))}
              size="small"
              sx={{ width: 80 }}
              inputProps={{ min: 0, max: 360, step: 1 }}
            />
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 3 }} />

      {/* RGB調整 */}
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
        RGB値調整
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {(['r', 'g', 'b'] as const).map((channel) => (
          <Grid size={4} key={channel}>
            <Typography variant="body2" gutterBottom>
              {channel.toUpperCase()}: {rgbValues[channel]}
            </Typography>
            <TextField
              type="number"
              value={rgbValues[channel]}
              onChange={(e) => handleRgbChange(channel, parseInt(e.target.value) || 0)}
              size="small"
              fullWidth
              inputProps={{ min: 0, max: 255, step: 1 }}
            />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mb: 3 }} />

      {/* プリセットカラー */}
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
        プリセットカラー
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {presetColors.map((color) => (
          <Box
            key={color}
            onClick={() => onChange(color)}
            sx={{
              width: 32,
              height: 32,
              backgroundColor: color,
              borderRadius: 1,
              cursor: 'pointer',
              border: currentColor.toLowerCase() === color.toLowerCase() 
                ? '3px solid' 
                : '1px solid rgba(0,0,0,0.1)',
              borderColor: currentColor.toLowerCase() === color.toLowerCase() 
                ? 'primary.main' 
                : 'rgba(0,0,0,0.1)',
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.2s'
              }
            }}
          />
        ))}
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        OkLCH色空間は知覚的に均一な色調整を提供し、より自然な色の変化を実現します。
      </Typography>
    </Paper>
  );
};

export default AdvancedColorPicker; 