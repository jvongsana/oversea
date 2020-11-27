import React, { useState } from 'react';
import Drawer from '../Drawer/Drawer';
import './App.scss';
import { makeStyles } from '@material-ui/core/styles';

import { getTransactionsByAccount } from '../../helpers/selectors'
import {useApplicationData} from "../../hooks/useApplicationData";
import AccountReport  from '../Container/AccountReport/AccountReport';
import TransactionTable from '../Container/TransactionTable/TransactionTable';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';


import { getCategoryByName,getTransactionTypeByName,getAccountByName} from '../../helpers/selectors';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import {Select, MenuItem,InputLabel} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';



const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: "#EFEEEE"
  }
});

export default function App() {
  const {
    state,
    setAccount,
    addCategory,
    addTransactions
  } = useApplicationData()
  
  const [input, setInput] = useState(0);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  console.log('app rerender')


  // setting state for Amount textfield
  const [inputAmount, setInputAmount] = useState(0);
  const handleChangeInputAmount = (event) => {
    setInputAmount(event.target.value);
  }
  // setting state for payee textfield
  const [inputPayee, setInputPayee] = useState(0);
  const handleChangeInputPayee = (event) => {
    setInputPayee(event.target.value);
  }
  
  // setting state for radio buttons
  const [selection, setSelection] = React.useState();
  const updateSelection = (event, value) => {
    setSelection(event.target.value);
  };

  // state for select menu for categories
  const [inputCategorie, setInputCategory] = React.useState("");
  const handleChangeCategory = event => {
    setInputCategory(event.target.value);
  };
  
  // state for datepicker
  var todayDate = new Date().toISOString().slice(0,10);
  const [inputDate, setInputDate] = React.useState(todayDate);
  const handleDateChange = event => {
    setInputDate(event.target.value);
  }
  

  const Category_id = getCategoryByName(state.categories, inputCategorie);
  const transaction_types_id = getTransactionTypeByName(state.transaction_types, selection);
  const account_id = getAccountByName(state.accounts,state.account);



  const addNewTransaction = () => {
    const data = {
      category_id:Category_id,
      account_id:account_id,
      transaction_type_id:transaction_types_id, 
      payee:inputPayee,
      amount_cents:Number(inputAmount),
      transaction_date:inputDate
    }
    addTransactions(data);
    setInputAmount("");
    setInputPayee("");
    setInputCategory("");
    setSelection("");
    handleClose();
  }




  const handleClose = () => {
    setInputCategory("")
    setOpen(false);
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChangeInput = (event) => {
    setInput(event.target.value);
  }

  const addNewCategory = () => {
    addCategory(input)
    setInput("");
    handleClose(); 
  }

  const transactions = getTransactionsByAccount(state, state.account);
  

  return (
      <div className={classes.container}>
        <Drawer 
          accounts={state.accounts}
          account={state.account}
          setAccount={setAccount}
        />
        {/* <Container 
          categories={state.categories}
          account={state.account}
          transactions={state.transactions} 
          transaction_type={state.transaction_types}
          accounts={state.accounts} 
        /> */}
        <div class="mainContainer">
          <AccountReport 
            account={state.account}
            transactions={transactions}
            categories={state.categories}
          />
          <TransactionTable
            account={state.account}
            transactions={transactions}
            categories={state.categories}
            transaction_types={state.transaction_types}
          />
          {/* CATEGORY BUTTON */}
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
                  <Button onClick={addNewCategory} color="primary" className={classes.button}>
                    Add
                  </Button>
                </DialogActions>
              </Dialog>
          </React.Fragment>
          {/* TRANSACTION BUTTON */}
          <React.Fragment>
            <Button variant="outlined" color="primary" onClick={handleClickOpen} className={classes.button}>
                Add Transactions
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
              <DialogTitle id="form-dialog-title">Add Transactions</DialogTitle>
              <DialogContent>
                
                <FormControl component="fieldset" className={classes.formControl}>
                  <h3>Enter Amount</h3>
                  <TextField
                    id="outlined-secondary"
                    label="upto 2 decimals "
                    variant="outlined"
                    color="primary"
                    onChange={handleChangeInputAmount}
                  /> 
                  <h3>Enter Payee</h3>
                  <TextField
                      id="outlined-secondary"
                      label=""
                      variant="outlined"
                      color="primary"
                      onChange={handleChangeInputPayee}
                  /> 
                  <h3>Select Category</h3>
                  <Select
                    value={inputCategorie}
                    className={classes.inner}
                    onChange={handleChangeCategory}
                    id="select"
                  >   
                    {
                      state.categories.map(category => (<MenuItem value={category.name}>{category.name}</MenuItem>))
                    }
                    
                  </Select>
                  
                  <h3>Select Transaction Type</h3>
                  <RadioGroup aria-label="gender" name="gender1"  onChange={updateSelection}>
                    <FormControlLabel value="Inflow" control={<Radio />} label="Inflow" className={classes.button}/>
                    <FormControlLabel value="Outflow" control={<Radio />} label="Outflow" className={classes.button} />
                  </RadioGroup>

                  <h4>Date</h4>
                  
                  <TextField
                    id="date"
                    label="Transaction Date"
                    type="date"
                    defaultValue={todayDate}
                    onChange={handleDateChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary" className={classes.button}>
                  Cancel
                </Button>
                <Button onClick={addNewTransaction} color="primary" className={classes.button}>
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </div>
      </div>
     
    );
}