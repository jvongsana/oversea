import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
  partial: {
    backgroundColor: '#a6d0ef',
    height: 'auto',
    width: '80vw',
    borderRadius: '20px',
    padding: '24px 48px 48px 48px'
  },
  pageButtons: {
    display: "flex",
    "justify-content": "space-evenly"
  },
  modalButtons: {
    padding: '10px',
    width: '220px',
    backgroundColor: '#01234c',
    borderRadius: '20px',
    textAlign: 'center',
    margin: '10px 0 10px 10px',
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

export default function AccountSettings(props) {
  const classes = useStyles();
  const { account, renameAccount, deleteAccount } = props;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(props.account || "");

  // open pop-up modal
  const handleOpen = () => {
    setOpen(true);
  };

  // close pop-up modal
  const handleClose = () => {
    setOpen(false);
  };

  // update textfield with keyboard inputs
  const handleChangeInput = (event) => {
    setInput(event.target.value);
  };

  // edit account in db
  const editAccount = () => {
    renameAccount(account, input);
    setInput("");
    handleClose();
  };

  return (
    <Container maxWidth="sm" className={classes.partial} >
      <CssBaseline />
      <h1>{account} Account Settings</h1>
      <div className={classes.pageButtons} >
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={handleOpen}
        >
          Edit
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
          <DialogTitle id="form-dialog-title">
            Edit Account
          </DialogTitle>
          <DialogContent >
            <h3>Enter New Account Name</h3>
            <FormControl component="fieldset" className={classes.formControl}>
              <TextField
                id="outlined-secondary"
                variant="outlined"
                color="primary"
                defaultValue={account}
                onChange={handleChangeInput}
              />
            </FormControl>
          </DialogContent>
          <DialogActions class={classes.root}>
            <Button onClick={editAccount} color="primary" className={classes.modalButtons}>
              Edit
            </Button>
            <Button onClick={handleClose} color="primary" className={classes.modalButtons}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={() => deleteAccount(account)}
        >
          Delete
        </Button>
      </div>
    </Container>
  );
}