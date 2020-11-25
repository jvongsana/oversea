import React, { useState }from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import axios from "axios";
import './AddAccount.scss'


export default function FormDialog() {
  const useStyles = makeStyles({
    button: {
      backgroundColor:'#01234c',
      "&:hover": {
        backgroundColor: '#a6d0ef'
      }
    },
    formControl: {
      width: 500,
      padding: '0 1em'
    },
  });

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(0);

  //handling open/close functionality for popup modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // setting state for textfield
  const handleChangeInput = (event) => {
    setInput(event.target.value);
  }

  //function to add account to db
  const addAccount = () => {
    const url = 'http://localhost:8080/api/accounts';
    axios.post(url, {name:input})
    .then((res) => {
      setInput("");
      handleClose();
    })
    .catch((err) => console.log("error is ", err));
  }
  
  const classes = useStyles();

  return (
    <div> 
      <Button variant="outlined" color="primary" onClick={handleClickOpen} className={classes.button}>
       + Accounts
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">Add Account</DialogTitle>
        <DialogContent >
          <h3>Enter Account Name</h3>
          <FormControl component="fieldset" className={classes.formControl}>
            <TextField
              id="outlined-secondary"
              label="Ex:- Saving"
              variant="outlined"
              color="primary" 
              onChange={handleChangeInput}
            /> 
          </FormControl>
        </DialogContent>
        <DialogActions class={classes.root}>
          <Button onClick={handleClose} color="primary" className={classes.button}>
            Cancel
          </Button>
          <Button onClick={addAccount} color="primary" className={classes.button}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  
}
