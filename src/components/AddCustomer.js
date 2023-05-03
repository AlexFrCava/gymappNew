import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";

export default function AddCustomer({ addCustomer }) {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = () => {
    addCustomer(customer);
    setOpen(false);
    console.log("closed");
  };

  const handleCancel = () => {
    setOpen(false);
    console.log("cancelled");
  };

  const inputChanged = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Button onClick={handleClickOpen} variant="outlined">
        Add customer
      </Button>

      <Dialog onClose={handleSave} open={open}>
        <DialogTitle>Add customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus={true}
            name="firstname"
            onChange={inputChanged}
            margin="dense"
            label="Firstname"
            fullWidth={true}
            variant="standard"
            value={customer.firstname}
          />
          <TextField
            name="lastname"
            value={customer.lastname}
            margin="dense"
            label="Lastname"
            fullWidth={true}
            variant="standard"
            onChange={inputChanged}
          />
          <TextField
            name="streetaddress"
            value={customer.streetaddress}
            margin="dense"
            label="Streetaddress"
            fullWidth={true}
            variant="standard"
            onChange={inputChanged}
          />
          <TextField
            name="postcode"
            value={customer.postcode}
            margin="dense"
            label="Postcode"
            fullWidth={true}
            variant="standard"
            onChange={inputChanged}
          />
          <TextField
            name="city"
            value={customer.city}
            margin="dense"
            label="City"
            fullWidth={true}
            variant="standard"
            onChange={inputChanged}
          />
          <TextField
            name="email"
            value={customer.email}
            margin="dense"
            label="Email"
            fullWidth={true}
            variant="standard"
            onChange={inputChanged}
          />
          <TextField
            name="phone"
            value={customer.phone}
            margin="dense"
            label="Phone:"
            fullWidth={true}
            variant="standard"
            onChange={inputChanged}
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
