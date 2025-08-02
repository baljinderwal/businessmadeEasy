import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Receipt as BillingIcon,
  Analytics as AnalyticsIcon,
  Mic as VoiceIcon,
} from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [currentTab, setCurrentTab] = useState(0);
  const [isListening, setIsListening] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleVoiceCommand = () => {
    setIsListening(!isListening);
    console.log('Voice command toggled:', !isListening);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BusinessMadeEasy - E-commerce Billing Software
          </Typography>
          <Button
            color="inherit"
            startIcon={<VoiceIcon />}
            onClick={handleVoiceCommand}
            sx={{ 
              backgroundColor: isListening ? 'rgba(255,255,255,0.2)' : 'transparent',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            {isListening ? 'Listening...' : 'Voice Control'}
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentTab} onChange={handleTabChange} aria-label="business tabs">
            <Tab icon={<DashboardIcon />} label="Dashboard" />
            <Tab icon={<BillingIcon />} label="Billing" />
            <Tab icon={<InventoryIcon />} label="Inventory" />
            <Tab icon={<AnalyticsIcon />} label="Analytics" />
          </Tabs>
        </Box>

        <TabPanel value={currentTab} index={0}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Sales Today
                  </Typography>
                  <Typography variant="h4">
                    $2,450.00
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Products in Stock
                  </Typography>
                  <Typography variant="h4">
                    1,247
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Low Stock Alerts
                  </Typography>
                  <Typography variant="h4" color="error">
                    12
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Orders Today
                  </Typography>
                  <Typography variant="h4">
                    89
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={currentTab} index={1}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Create New Bill
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Customer Name"
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Customer Email"
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Product/Service"
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Quantity"
                  type="number"
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Unit Price"
                  type="number"
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid size={12}>
                <Button variant="contained" size="large" sx={{ mt: 2 }}>
                  Generate Bill
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>

        <TabPanel value={currentTab} index={2}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Inventory Management
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Product Name"
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Current Stock"
                  type="number"
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid size={12}>
                <Button variant="contained" sx={{ mr: 2 }}>
                  Add Product
                </Button>
                <Button variant="outlined" onClick={handleVoiceCommand}>
                  {isListening ? 'Stop Voice Input' : 'Use Voice to Add/Remove'}
                </Button>
              </Grid>
            </Grid>
            
            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
              Low Stock Alerts
            </Typography>
            <Card>
              <CardContent>
                <Typography color="error">
                  • Product A - Only 5 units left
                </Typography>
                <Typography color="error">
                  • Product B - Only 2 units left
                </Typography>
                <Typography color="error">
                  • Product C - Out of stock
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </TabPanel>

        <TabPanel value={currentTab} index={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Sales Analytics
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Weekly Sales
                    </Typography>
                    <Typography variant="body2">
                      Sales chart would be displayed here using Recharts
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Top Products
                    </Typography>
                    <Typography variant="body2">
                      • Product A - 150 sales
                    </Typography>
                    <Typography variant="body2">
                      • Product B - 120 sales
                    </Typography>
                    <Typography variant="body2">
                      • Product C - 95 sales
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>
      </Container>
    </ThemeProvider>
  );
}

export default App;
