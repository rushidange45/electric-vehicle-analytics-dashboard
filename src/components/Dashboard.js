import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Card,
  CardContent,
  Paper,
} from '@mui/material';
import { Autocomplete } from '@mui/material';
import { BarChart, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Bar } from 'recharts';
import SummaryCards from './charts/SummaryCards'; // Assuming you have this component
import { fetchEVData } from '../services/dataService';

function Dashboard() {
  const [data, setData] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [filteredModels, setFilteredModels] = useState([]);
  const [makes, setMakes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const csvData = await fetchEVData();
        setData(csvData);
        const uniqueMakes = [...new Set(csvData.map(item => item.Make))]; // Get unique makes
        setMakes(uniqueMakes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);

  // Update models based on selected Make
  useEffect(() => {
    if (selectedMake) {
      const models = [...new Set(data.filter(item => item.Make === selectedMake).map(item => item.Model))]; // Unique models only
      setFilteredModels(models);
      setSelectedModel(''); // Reset model filter on Make change
    } else {
      setFilteredModels([]);
    }
  }, [selectedMake, data]);

  // Filtered data
  const filteredData = data.filter(item =>
    (selectedMake ? item.Make === selectedMake : true) &&
    (selectedModel ? item.Model === selectedModel : true)
  );

  // Prepare data for Bar Chart (Manufacturer Distribution)
  const manufacturerData = filteredData.reduce((acc, item) => {
    acc[item.Make] = (acc[item.Make] || 0) + 1;
    return acc;
  }, {});
  const barChartData = Object.keys(manufacturerData).map(make => ({
    name: make,
    count: manufacturerData[make],
  }));

  // Prepare data for Electric Range Distribution
  const rangeData = filteredData.slice(0, 10).map((row, index) => ({
    name: row.Model,
    range: row['Electric Range'],
  }));

  return (
    <Box sx={{
      padding: '80px 20px 80px', // Adjusted for fixed header and footer
      backgroundColor: '#dfeaf5', // Updated background color
      overflowY: 'auto', // Enable scrolling for the content
      height: "80vh", // Fixed height to prevent scrolling
    }}>

      {/* Summary Cards */}
      <SummaryCards data={filteredData} />

      {/* Filters Section */}
      <Grid container spacing={3} sx={{ marginBottom: 3, alignItems: 'center', marginTop:2 }}> {/* Align items vertically */}
        <Grid item xs={6}>
          <Paper elevation={1} sx={{ backgroundColor:"transparent" }}>
            <Autocomplete
              disablePortal 
              options={makes}
              getOptionLabel={(option) => option}
              value={selectedMake}
              onChange={(e, value) => {
                setSelectedMake(value || '');
              }}
              renderInput={(params) => (
                <TextField {...params} label="Manufacturer"  />
              )}
              ListboxProps={{ style: { maxHeight: 170, background:'transparent' } }}
            />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper elevation={1} sx={{ backgroundColor:"transparent" }}>
            <Autocomplete
              disablePortal
              options={filteredModels}
              getOptionLabel={(option) => option}
              value={selectedModel}
              onChange={(e, value) => setSelectedModel(value || '')}
              renderInput={(params) => (
                <TextField {...params} label="Model"   />
              )}
              ListboxProps={{ style: { maxHeight: 170 } }}
              disabled={!selectedMake}
            />
          </Paper>
        </Grid>
      </Grid>

      {filteredData.length > 0 ? (
        <Grid container spacing={3}>
          {/* Manufacturer Distribution Section - Bar Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, backgroundColor: '#e7f5e9' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Manufacturer Distribution
                </Typography>
                <BarChart width={500} height={350} data={barChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Legend />
                  <Bar dataKey="count" fill="#66bb6a" /> {/* Updated bar color */}
                </BarChart>
              </CardContent>
            </Card>
          </Grid>

          {/* Electric Range Distribution Section - Column Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, backgroundColor: '#e7f5e9' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Electric Range by Model
                </Typography>
                <BarChart width={500} height={350} data={rangeData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Legend />
                  <Bar dataKey="range" fill="#42a5f5" /> {/* Updated bar color */}
                </BarChart>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body1" align="center">
          Loading data...
        </Typography>
      )}
    </Box>
  );
}

export default Dashboard;
