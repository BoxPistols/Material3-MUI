import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Chip,
  LinearProgress,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  ShoppingCart,
  AttachMoney,
  Visibility,
  Edit,
  Delete,
  Add,
  Search,
  FilterList,
  Download,
} from '@mui/icons-material';

// モックデータ
const statsData = [
  {
    title: '総売上',
    value: '¥2,847,392',
    change: '+12.5%',
    trend: 'up',
    icon: AttachMoney,
  },
  {
    title: '新規ユーザー',
    value: '1,247',
    change: '+8.2%',
    trend: 'up',
    icon: People,
  },
  {
    title: '注文数',
    value: '892',
    change: '-3.1%',
    trend: 'down',
    icon: ShoppingCart,
  },
  {
    title: 'ページビュー',
    value: '45,892',
    change: '+15.7%',
    trend: 'up',
    icon: Visibility,
  },
];

const recentOrders = [
  {
    id: '#ORD-001',
    customer: '田中太郎',
    email: 'tanaka@example.com',
    amount: '¥12,500',
    status: 'completed',
    date: '2024-01-15',
  },
  {
    id: '#ORD-002',
    customer: '佐藤花子',
    email: 'sato@example.com',
    amount: '¥8,900',
    status: 'pending',
    date: '2024-01-15',
  },
  {
    id: '#ORD-003',
    customer: '鈴木一郎',
    email: 'suzuki@example.com',
    amount: '¥15,200',
    status: 'processing',
    date: '2024-01-14',
  },
  {
    id: '#ORD-004',
    customer: '高橋美咲',
    email: 'takahashi@example.com',
    amount: '¥6,750',
    status: 'completed',
    date: '2024-01-14',
  },
  {
    id: '#ORD-005',
    customer: '山田健太',
    email: 'yamada@example.com',
    amount: '¥22,100',
    status: 'cancelled',
    date: '2024-01-13',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'pending':
      return 'warning';
    case 'processing':
      return 'info';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'completed':
      return '完了';
    case 'pending':
      return '保留中';
    case 'processing':
      return '処理中';
    case 'cancelled':
      return 'キャンセル';
    default:
      return status;
  }
};

const DashboardPage: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      {/* ヘッダー */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          📊 SaaS Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          管理画面のサンプルです。Material Design 3のコンポーネントを使用しています。
        </Typography>
      </Box>

      {/* 統計カード */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat) => {
          const IconComponent = stat.icon;
          const isPositive = stat.trend === 'up';
          return (
            <Grid key={stat.title} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card elevation={1}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        mr: 2,
                      }}
                    >
                      <IconComponent />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {stat.title}
                      </Typography>
                      <Typography variant="h5" fontWeight="bold">
                        {stat.value}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {isPositive ? (
                      <TrendingUp color="success" fontSize="small" />
                    ) : (
                      <TrendingDown color="error" fontSize="small" />
                    )}
                    <Typography
                      variant="body2"
                      color={isPositive ? 'success.main' : 'error.main'}
                      sx={{ ml: 0.5 }}
                    >
                      {stat.change}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      前月比
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* メインコンテンツ */}
      <Grid container spacing={3}>
        {/* 売上チャート（モック） */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card elevation={1}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                売上推移
              </Typography>
              <Box
                sx={{
                  height: 300,
                  backgroundColor: 'grey.50',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px dashed',
                  borderColor: 'grey.300',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  チャートエリア（Chart.jsやRechartsなどを使用）
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 最近のアクティビティ */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card elevation={1}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                最近のアクティビティ
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[
                  { action: '新規注文', time: '5分前', user: '田中太郎' },
                  { action: 'ユーザー登録', time: '12分前', user: '佐藤花子' },
                  { action: '商品更新', time: '1時間前', user: '管理者' },
                  { action: '支払い完了', time: '2時間前', user: '鈴木一郎' },
                ].map((activity, index) => (
                  <Box key={index} sx={{ mb: 2, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="body2" fontWeight="medium">
                      {activity.action}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.user} • {activity.time}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 注文管理テーブル */}
      <Card elevation={1} sx={{ mt: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">最近の注文</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" startIcon={<FilterList />} size="small">
                フィルター
              </Button>
              <Button variant="outlined" startIcon={<Download />} size="small">
                エクスポート
              </Button>
              <Button variant="filled" startIcon={<Add />} size="small">
                新規作成
              </Button>
            </Box>
          </Box>

          {/* 検索・フィルター */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              label="検索"
              placeholder="注文ID、顧客名で検索"
              size="small"
              sx={{ minWidth: 200 }}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                ステータス
              </Typography>
              <Select defaultValue="all">
                <MenuItem value="all">すべて</MenuItem>
                <MenuItem value="completed">完了</MenuItem>
                <MenuItem value="pending">保留中</MenuItem>
                <MenuItem value="processing">処理中</MenuItem>
                <MenuItem value="cancelled">キャンセル</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* テーブル */}
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>注文ID</TableCell>
                  <TableCell>顧客</TableCell>
                  <TableCell>金額</TableCell>
                  <TableCell>ステータス</TableCell>
                  <TableCell>日付</TableCell>
                  <TableCell align="right">アクション</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {order.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">{order.customer}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {order.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {order.amount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(order.status)}
                        color={getStatusColor(order.status) as 'success' | 'warning' | 'info' | 'error' | 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{order.date}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" color="primary">
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="primary">
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ページネーション（モック） */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              1-5 of 127 items
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" size="small" disabled>
                前へ
              </Button>
              <Button variant="outlined" size="small">
                次へ
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* プロジェクト進捗（モック） */}
      <Card elevation={1} sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            プロジェクト進捗
          </Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {[
              { name: 'ウェブサイトリニューアル', progress: 75, deadline: '2024-02-15' },
              { name: 'モバイルアプリ開発', progress: 45, deadline: '2024-03-01' },
              { name: 'API統合', progress: 90, deadline: '2024-01-30' },
            ].map((project, index) => (
              <Grid key={index} size={{ xs: 12, md: 4 }}>
                <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                  <Typography variant="body2" fontWeight="medium" gutterBottom>
                    {project.name}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={project.progress}
                    sx={{ mb: 1, height: 6, borderRadius: 3 }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      {project.progress}% 完了
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      期限: {project.deadline}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashboardPage; 