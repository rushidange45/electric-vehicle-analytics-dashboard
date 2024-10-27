// src/components/SummaryCards.js
import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

function SummaryCards({ data }) {
    const totalEVs = data.length;
    const avgRange = (data.reduce((acc, item) => acc + parseFloat(item['Electric Range']), 0) / totalEVs).toFixed(2);
    const manufacturers = [...new Set(data.map(item => item.Make))].length;
  
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, backgroundColor: '#f1f8e9' }}>
            <CardContent>
              <Typography variant="h6" color="textPrimary">Total Electric Vehicles</Typography>
              <Typography variant="h4">{totalEVs}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, backgroundColor: '#e8f5e9' }}>
            <CardContent>
              <Typography variant="h6" color="textPrimary">Average Electric Range (miles)</Typography>
              <Typography variant="h4">{avgRange}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, backgroundColor: '#c8e6c9' }}>
            <CardContent>
              <Typography variant="h6" color="textPrimary">Total Manufacturers</Typography>
              <Typography variant="h4">{manufacturers}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
export default SummaryCards;
