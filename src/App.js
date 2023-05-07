import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { useState } from 'react';

import CustomerList from './components/CustomerList';
import ExerciseList from './components/ExerciseList';
import ExerciseCalendar from './components/ExerciseCalendar';

function App() {
  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {
      setValue(value);
  };

  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar> 
          <Typography variant='h5'>
          Personal Trainer
          </Typography>
          <Tabs
  value={value}
  onChange={handleChange}
  TabIndicatorProps={{ style: { backgroundColor: 'white' } }} 
>
  <Tab
    label="Customers"
    value="one"
    sx={{
      '&.Mui-selected': {
        color: 'white', 
       fontWeight: 'bold', 
      },
    }}
  />
  <Tab
    label="Exercises"
    value="two"
    sx={{
      '&.Mui-selected': {
        color: 'white', 
       fontWeight: 'bold', 
      },
    }}
  />
  <Tab
    label="Calendar"
    value="three"
    sx={{
      '&.Mui-selected': {
        color: 'white', 
       fontWeight: 'bold', 
      },
    }}
  />
</Tabs>
        </Toolbar>
      </AppBar>
      {value==='one' && <div><CustomerList/></div>}
      {value==='two'&& <div><ExerciseList/></div>}
      {value === 'three' && <div><ExerciseCalendar /></div>}
    </div>
  );
}

export default App;
