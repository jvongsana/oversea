import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles({
  button: {
    padding: '10px',
    backgroundColor: '#01234c',
    borderRadius: '10px',
    textAlign: 'center',
    "&:hover": {
      backgroundColor: '#a6d0ef',
      padding: '10px',
      borderRadius: '20px'
    }
  },
  formControl: {
    width: 500,
    padding: '0 1em'
  }
});

function AddAccount(props) {
  const classes = useStyles();
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
  };

  //function to add account to db
  const addNewAccount = () => {
    const user_id = 1;

    props.addAccount(user_id, input);
    setInput("");
    handleClose();
  };


  return (
    <React.Fragment>
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
          <Button onClick={addNewAccount} color="primary" className={classes.button}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AddAccount;