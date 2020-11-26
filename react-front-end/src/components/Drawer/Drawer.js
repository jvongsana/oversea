import React, { useState } from 'react';
import './Drawer.scss';
import { Drawer as Sidebar } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import AccountListItems from '../AccountListItems/AccountListItems';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import {useApplicationData} from "../../hooks/useApplicationData";
import {getID} from '../../helpers/selectors'

const useStyles = makeStyles({
  drawer: {
    width: '240px',
    color: 'white'
  },
  paper: {
    backgroundColor: '#01234c',
    width: '240px',
    textAlign: 'center'
  },
  button: {
    padding: '10px',
    backgroundColor:'#01234c',
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



function Drawer(props) {
  const classes = useStyles();
  const {
    state,
    addAccount
  } = useApplicationData()
  
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
  console.log('rerendered');
  //function to add account to db
  const addNewAccount = () => {
    const user_id = 1;

    addAccount(user_id, input)
    setInput("");
    handleClose();
  }

  return (
    <Sidebar variant="permanent" className={classes.drawer} classes={{ paper: classes.paper }}>
      <img
        className="logo--centered"
        src={require('../../images/logo-white.png')}
        alt="Interview Scheduler"
        width="100px"
        height="100px"
      />
      <AccountListItems 
        accounts={state.accounts}
        setAccount={props.setAccount}
      />
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
    </Sidebar> 
  );
}

export default Drawer;