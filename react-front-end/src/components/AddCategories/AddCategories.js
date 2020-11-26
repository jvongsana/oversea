import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import axios from "axios";
import './AddCategories.scss'


export default function AddCategories() {

  const useStyles = makeStyles({
  
    button: {
      float: 'right',
      backgroundColor:'#01234c',
      "&:hover": {
        backgroundColor: '#a6d0ef'
      },
      fontSize: '10px'
    },
    formControl: {
      width: 500,
      padding: '0 1em'
    }
  });
  const [open, setOpen] = useState(false);

  //handling open/close functionality for popup modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  // setting state for textfield
  const [input, setInput] = useState(0);
  const handleChangeInput = (event) => {
    setInput(event.target.value);
  }

  //function to add account to db
  const addCategories = () => {
    
    let url = 'http://localhost:8080/api/categories';
    axios.post(url, {name:input})
    .then((res) => {
      setInput("");
      handleClose();
    })
    .catch((err) => console.log("error is ", err));
   
  }
  
  
  const classes = useStyles();
  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} className={classes.button}>
       Add Categories
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
        <DialogContent>
          <h3>Enter Category</h3>
          <FormControl component="fieldset" className={classes.formControl}>
            <TextField
              id="outlined-secondary"
              label=""
              variant="outlined"
              color="primary"
              onChange={handleChangeInput}
            /> 
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" className={classes.button}>
            Cancel
          </Button>
          <Button onClick={addCategories} color="primary" className={classes.button}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
  
}
