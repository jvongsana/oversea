import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container as Partial } from '@material-ui/core/';
import AccountReport  from './AccountReport/AccountReport';
import TransactionTable from './TransactionTable/TransactionTable';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import './Container.scss';
import {useApplicationData} from "../../hooks/useApplicationData";
import { getTransactionsByAccount } from '../../helpers/selectors';


const useStyles = makeStyles({
  partial: {
    backgroundColor: '#EFEEEE',
    height: '90vh',
    marginTop: '6em'
  },
  button: {
    marginTop: '3.5em',
    marginLeft: '5em',
    backgroundColor:'#01234c',
    "&:hover": {
      backgroundColor: '#a6d0ef'
    },
    fontSize: '12px'
  },
  formControl: {
    width: 500,
    padding: '0 1em'
  }
});

export default function Container(props) {
  const classes = useStyles();
  const {
    state,
    addCategory
  } = useApplicationData()

  const [input, setInput] = useState(0);
  const [open, setOpen] = useState(false);

  //handling open/close functionality for popup modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeInput = (event) => {
    setInput(event.target.value);
  }
  console.log('container', props)
  //function to add account to db
  const addNewCategory = () => {
    addCategory(input)
    setInput("");
    handleClose(); 
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Partial maxWidth="xl" className={classes.partial}>
        {/* <Dashboard /> */}
        <AccountReport 
          account={props.account}
          transactions={props.transactions}
          categories={props.categories}
        /> 
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
                <Button onClick={addNewCategory} color="primary" className={classes.button}>
                  Add
                </Button>
              </DialogActions>
            </Dialog>
        <TransactionTable 
          account={props.account}
          transactions={getTransactionsByAccount(props.transactions, props.account)}
          categories={props.categories}
          transaction_types={props.transaction_type}
        />
      </Partial>
    </React.Fragment>
  );
}