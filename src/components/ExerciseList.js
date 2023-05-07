import React, { useState, useEffect } from 'react';
import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/styles/ag-grid.css';
import { Button } from '@mui/material';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import { Exercises_API } from '../constants';
import { Full_API } from '../constants';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);



export default function ExerciseList() {
  const [exercises, setExercises] = useState([]);

  const [columnDefs] = useState([
    {
      field: "date",
      sortable: true,
      filter: true,
      cellRenderer: (exercises) => {
        return dayjs.utc(exercises.value).format("DD/MM/YYYY HH:mm");
      },
    },
    { 
      headerName: "Activity",
      field: "activity",
      sortable: true, 
      filter: true },
    {
      headerName: "Duration",
      field: "duration", 
      sortable: true, 
      filter: true },
    {
      headerName: 'Firstname',
      field: 'customer.firstname',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Lastname',
      field: 'customer.lastname',
      sortable: true,
      filter: true
    },
    {
      headerName: '',
      field: 'id',
      sortable: true,
      filter: true,
      cellRenderer: params => 
      <Button  color='error' variant="outlined" onClick={() => deleteExercise(params.value)}>Delete</Button>
    }
  ])

  useEffect(() => {
    getExercises();
  }, []);
  const getExercises = () => {
    fetch(Full_API)
      .then(response => response.json())
      .then(data => {
        console.log(data); 
        setExercises(data);
      })
      .catch(err => console.error(err))
  }

  const deleteExercise = (id) => {
    if (window.confirm('Delete this exercise?')) {
      fetch(Exercises_API+'/' + id, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            getExercises();
          }
          else
            alert('Error');
        })
        .catch(err => console.error(err))
    }
  }

  return (
    <div className="App">
      <div className="ag-theme-material" style={{ height: 550, width: '100%', margin: 'auto' }}>

        
        <AgGridReact
           rowData={Array.isArray(exercises) ? exercises : []}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  )
}