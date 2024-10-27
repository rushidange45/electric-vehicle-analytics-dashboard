import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Container from '@mui/material/Container';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Container 
        maxWidth="lg" 
        sx={{ flexGrow: 1, minHeight: '88vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <Dashboard />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
