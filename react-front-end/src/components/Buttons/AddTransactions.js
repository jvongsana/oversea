import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import { getCategoryByName, getTransactionTypeByName, getAccountByName } from '../../helpers/selectors';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { Select, MenuItem } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles({
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

export default function AddTransactions(props) {

  const [openTransaction, setOpenTransaction] = useState(false);

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

  const category_id = getCategoryByName(props.categories, inputTransactionCategory);
  const transaction_types_id = getTransactionTypeByName(props.transaction_types, selection);
  const account_id = getAccountByName(props.accounts, props.account);

  const handleCloseTransaction = () => {
    setInputTransactionCategory("");
    setOpenTransaction(false);
  };

  const addNewTransaction = () => {
    const data = {
      category_id: category_id,
      account_id: account_id,
      transaction_type_id: transaction_types_id,
      payee: inputPayee,
      amount_cents: Number(inputAmount) * 100,
      transaction_date: inputDate
    };
    props.addTransactions(data);
    setInputAmount("");
    setInputPayee("");
    setInputTransactionCategory("");
    setSelection("");
    handleCloseTransaction();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleOpenTransaction} className={classes.button}>
        Add Transaction
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
                props.categories.map(category => (<MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>))
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
              defaultValue={inputDate}
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
  );
}