import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function AddExercise({ addExercise, data }) {
  const [open, setOpen] = React.useState(false);
  const [exercise, setExercise] = React.useState({
    duration: 0,
    activity: "",
    date: "",
  });
  const [date, setDate] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
    console.log(data);
  };

  const handleSave = () => {
    const newExercise = {
      ...exercise,
      date: dayjs(date).format("YYYY-MM-DDTHH:mm:ss"),
      customer: data.links[0].href,
    };

    addExercise(newExercise);
    console.log(newExercise);
    setOpen(false);
    console.log("saved");
  };

  const handleCancel = () => {
    setOpen(false);
    console.log("cancelled");
  };

  const inputChanged = (event) => {
    setExercise({ ...exercise, [event.target.name]: event.target.value });
  };

  const handleDateChange = (newDate) => {
    const dateTime = dayjs(newDate).format("YYYY-MM-DDTHH:mm:ss");
    setDate(dateTime);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} variant="outlined">
        Add Exercise
      </Button>

      <Dialog onClose={handleSave} open={open}>
        <DialogTitle>Add Exercise</DialogTitle>
        <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker label="Basic date time picker" 
            autoFocus={true}
            name="date"
            onChange={(newDate) => handleDateChange(newDate)}
            renderInput={(props)=><TextField {...props} />}
            value={date}
            fullWidth={true}
            ampm={false}
            />
            </LocalizationProvider>
          <TextField
            autoFocus={true}
            name="duration"
            onChange={inputChanged}
            margin="dense"
            label="Duration"
            fullWidth={true}
            variant="standard"
            value={exercise.duration}
          />
          <TextField
            autoFocus={true}
            name="activity"
            onChange={inputChanged}
            margin="dense"
            label="Activity"
            fullWidth={true}
            variant="standard"
            value={exercise.activity}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
