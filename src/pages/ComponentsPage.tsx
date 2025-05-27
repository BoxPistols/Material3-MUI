import {
  Box,
  Typography,
  Paper,
  TextField,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Switch,
  Slider,
  Chip,
  Avatar,
  Badge,
  IconButton,
  Fab,
  Alert,
  LinearProgress,
  CircularProgress,
  Divider,
} from '@mui/material';
import { Widgets, Home, Star, Add, Email } from '@mui/icons-material';
import { useState } from 'react';

const ComponentsPage: React.FC = () => {
  const [textValue, setTextValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [switchValue, setSwitchValue] = useState(false);
  const [sliderValue, setSliderValue] = useState(30);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Widgets /> MUI コンポーネント + Material Design 3
      </Typography>
      
      <Typography variant="body1" paragraph>
        MUIの各コンポーネントがMaterial Design 3テーマでどのように表示されるかを確認できます。
      </Typography>

      {/* Form Components */}
      <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          フォームコンポーネント
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="テキストフィールド"
            variant="outlined"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            helperText="Material Design 3スタイルのテキストフィールド"
          />
          
          <TextField
            label="塗りつぶしスタイル"
            variant="filled"
            defaultValue="Filled variant"
          />
          
          <TextField
            label="標準スタイル"
            variant="standard"
            defaultValue="Standard variant"
          />
          
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
              }
              label="チェックボックス"
            />
          </Box>
          
          <FormControl>
            <FormLabel>ラジオボタン</FormLabel>
            <RadioGroup
              value={radioValue}
              onChange={(e) => setRadioValue(e.target.value)}
              row
            >
              <FormControlLabel value="option1" control={<Radio />} label="オプション 1" />
              <FormControlLabel value="option2" control={<Radio />} label="オプション 2" />
              <FormControlLabel value="option3" control={<Radio />} label="オプション 3" />
            </RadioGroup>
          </FormControl>
          
          <FormControlLabel
            control={
              <Switch
                checked={switchValue}
                onChange={(e) => setSwitchValue(e.target.checked)}
              />
            }
            label="スイッチ"
          />
          
          <Box>
            <Typography gutterBottom>スライダー</Typography>
            <Slider
              value={sliderValue}
              onChange={(_, newValue) => setSliderValue(newValue as number)}
              valueLabelDisplay="auto"
              step={10}
              marks
              min={0}
              max={100}
            />
          </Box>
        </Box>
      </Paper>

      {/* Display Components */}
      <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          表示コンポーネント
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="h6" gutterBottom>チップ</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="デフォルト" />
              <Chip label="削除可能" onDelete={() => {}} />
              <Chip label="クリック可能" onClick={() => {}} />
              <Chip label="アバター付き" avatar={<Avatar>A</Avatar>} />
              <Chip label="カラー" color="primary" />
              <Chip label="セカンダリ" color="secondary" />
            </Box>
          </Box>
          
          <Box>
            <Typography variant="h6" gutterBottom>アバターとバッジ</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Avatar>U</Avatar>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>S</Avatar>
              <Badge badgeContent={4} color="primary">
                <Avatar>B</Avatar>
              </Badge>
              <Badge badgeContent={99} color="error">
                <Avatar>N</Avatar>
              </Badge>
            </Box>
          </Box>
          
          <Box>
            <Typography variant="h6" gutterBottom>ボタン類</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <IconButton color="primary">
                <Home />
              </IconButton>
              <IconButton color="secondary">
                <Star />
              </IconButton>
              <Fab color="primary" size="small">
                <Add />
              </Fab>
              <Fab color="secondary">
                <Email />
              </Fab>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Feedback Components */}
      <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          フィードバックコンポーネント
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Alert severity="success">成功メッセージです</Alert>
          <Alert severity="info">情報メッセージです</Alert>
          <Alert severity="warning">警告メッセージです</Alert>
          <Alert severity="error">エラーメッセージです</Alert>
          
          <Box>
            <Typography variant="h6" gutterBottom>プログレス</Typography>
            <LinearProgress sx={{ mb: 2 }} />
            <LinearProgress variant="determinate" value={70} sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <CircularProgress size={24} />
              <CircularProgress variant="determinate" value={75} />
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Layout Components */}
      <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          レイアウトコンポーネント
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="h6" gutterBottom>ディバイダー</Typography>
            <Typography variant="body2">上のテキスト</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2">下のテキスト</Typography>
          </Box>
          
          <Box>
            <Typography variant="h6" gutterBottom>ペーパー（エレベーション）</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {[0, 1, 2, 4, 8].map((elevation) => (
                <Paper
                  key={elevation}
                  elevation={elevation}
                  sx={{ p: 2, minWidth: 80, textAlign: 'center' }}
                >
                  {elevation}
                </Paper>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ComponentsPage; 