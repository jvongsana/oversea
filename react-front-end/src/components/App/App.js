import React, { useState } from 'react';
import Drawer from '../Drawer/Drawer';
import './App.scss';
import { makeStyles } from '@material-ui/core/styles';
import { getTransactionsByAccount } from '../../helpers/selectors';
import { useApplicationData } from "../../hooks/useApplicationData";
import AccountReport from '../AccountReport/AccountReport';
import TransactionTable from '../TransactionTable/TransactionTable';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import AccountSettings from '../AccountSettings/AccountSettings';
import { getCategoryByName, getTransactionTypeByName, getAccountByName } from '../../helpers/selectors';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { Select, MenuItem } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddCategory from '../Buttons/AddCategory'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: "#EFEEEE"
  },
  partial: {
    backgroundColor: '#EFEEEE',
    height: '90vh',
    marginTop: '6em'
  },
  button: {
    marginTop: '3.5em',
    marginLeft: '5em',
    backgroundColor: '#01234c',
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

export default function App(props) {
  const {
    state,
    setAccount,
    addCategory,
    addTransactions,
    addAccount,
    renameAccount,
    deleteAccount
  } = useApplicationData();

  const [input, setInput] = useState(0);
  const [openTransaction, setOpenTransaction] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const classes = useStyles();

  // setting state for Amount textfield
  const [inputAmount, setInputAmount] = useState(0);
  const handleChangeInputAmount = (event) => {
    setInputAmount(event.target.value);
  };
  // setting state for payee textfield
  const [inputPayee, setInputPayee] = useState(0);
  const handleChangeInputPayee = (event) => {
    setInputPayee(event.target.value);
  };

  // setting state for radio buttons
  const [selection, setSelection] = React.useState();
  const updateSelection = (event, value) => {
    setSelection(event.target.value);
  };

  // state for select menu for categories
  const [inputTransactionCategory, setInputTransactionCategory] = React.useState("");
  const handleChangeCategory = event => {
    setInputTransactionCategory(event.target.value);
  };

  const handleOpenTransaction = () => {
    setOpenTransaction(true);
  };

  // state for datepicker
  var todayDate = new Date().toISOString().slice(0, 10);
  const [inputDate, setInputDate] = React.useState(todayDate);
  const handleDateChange = event => {
    setInputDate(event.target.value);
  };

  const Category_id = getCategoryByName(state.categories, inputTransactionCategory);
  const transaction_types_id = getTransactionTypeByName(state.transaction_types, selection);
  const account_id = getAccountByName(state.accounts, state.account);

  const handleCloseTransaction = () => {
    setInputTransactionCategory("");
    setOpenTransaction(false);
  };

  const addNewTransaction = () => {
    const data = {
      category_id: Category_id,
      account_id: account_id,
      transaction_type_id: transaction_types_id,
      payee: inputPayee,
      amount_cents: Number(inputAmount),
      transaction_date: inputDate
    };
    addTransactions(data);
    setInputAmount("");
    setInputPayee("");
    setInputTransactionCategory("");
    setSelection("");
    handleCloseTransaction();
  };


  // const handleCloseCategory = () => {
  //   setInputTransactionCategory("");
  //   setOpenCategory(false);
  // };

  // const handleOpenCategory = () => {
  //   setOpenCategory(true);
  // };

  // const handleChangeInput = (event) => {
  //   setInput(event.target.value);
  // };

  // const addNewCategory = () => {
  //   addCategory(input);
  //   setInput("");
  //   handleCloseCategory();
  // };

  const transactions = getTransactionsByAccount(state, state.account);


  return (
    <div className={classes.container}>
      <Drawer
        transactions={state.transactions}
        accounts={state.accounts}
        account={state.account}
        setAccount={setAccount}
        addAccount={addAccount}
      />
      <div class="mainContainer">
        <AccountReport
          account={state.account}
          transactions={transactions}
          categories={state.categories}
        />

        {/* CATEGORY BUTTON */}
        <AddCategory 
          addCategory={addCategory}
        />
        {/* TRANSACTION BUTTON */}
        <React.Fragment>
          <Button variant="outlined" color="primary" onClick={handleOpenTransaction} className={classes.button}>
            Add Transactions
            </Button>
          <Dialog open={openTransaction} onClose={handleCloseTransaction} aria-labelledby="form-dialog-title" >
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
                  value={inputTransactionCategory}
                  className={classes.inner}
                  onChange={handleChangeCategory}
                  id="select"
                >
                  {
                    state.categories.map(category => (<MenuItem value={category.name}>{category.name}</MenuItem>))
                  }

                </Select>

                <h3>Select Transaction Type</h3>
                <RadioGroup aria-label="gender" name="gender1" onChange={updateSelection}>
                  <FormControlLabel value="Inflow" control={<Radio />} label="Inflow" className={classes.button} />
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
              <Button onClick={handleCloseTransaction} color="primary" className={classes.button}>
                Cancel
                </Button>
              <Button onClick={addNewTransaction} color="primary" className={classes.button}>
                Add
                </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
        <TransactionTable
          account={state.account}
          transactions={transactions}
          categories={state.categories}
          transaction_types={state.transaction_types}
        />
        <AccountSettings
          account={state.account}
          renameAccount={renameAccount}
          deleteAccount={deleteAccount}
        />
      </div>
    </div>

  );
}