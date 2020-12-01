import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import { getCategoryById, getTransactionTypeById, getAmountDollars } from '../../helpers/selectors';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { Select, MenuItem } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { getCategoryByName, getTransactionTypeByName } from '../../helpers/selectors';

const useStyles = makeStyles((theme) => ({
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
}));

export default function EditTransaction(props) {

  const classes = useStyles();
  
  // state for transcation id
  const [id, setID] = useState("");
  // state for payee
  const [inputPayee, setInputPayee] = useState("");
  const handleChangeInputPayee = (event) => {
    setInputPayee(event.target.value);
  };

  // state for select menu for categories
  const [inputTransactionCategory, setInputTransactionCategory] = React.useState("");
  const handleChangeCategory = event => {
    setInputTransactionCategory(event.target.value);
  };

  // setting state for Amount textfield
  const [inputAmount, setInputAmount] = useState(0);
  const handleChangeInputAmount = (event) => {
    setInputAmount(event.target.value);
  };

  // state for datepicker
  const [inputDate, setInputDate] = React.useState();
  const handleDateChange = event => {
    setInputDate(event.target.value);
  };

  // setting state for radio buttons
  const [selection, setSelection] = React.useState();
  const updateSelection = (event, value) => {
    setSelection(event.target.value);
  };

  const [openTransaction, setOpenTransaction] = useState(false);
  const handleOpenTransaction = (transaction) => {
    
    setOpenTransaction(true);
    setInputPayee(transaction.payee);

    const categoryName = getCategoryById(props.categories, transaction.category_id);
    setInputTransactionCategory(categoryName);

    const Amount = getAmountDollars(transaction.amount_cents);
    setInputAmount(Amount);

    const formatYmd = date => date.slice(0, 10);
    setInputDate(formatYmd(transaction.transaction_date));

    const transactionTypeName = getTransactionTypeById(props.transaction_types, transaction.transaction_type_id);
    setSelection(transactionTypeName);

    setID(transaction.id);
  };

  const handleCloseTransaction = () => {
    setOpenTransaction(false);
  };

  //function to edit transaction
  const EditTransation = () => {
    const Category_id = getCategoryByName(props.categories, inputTransactionCategory);
    const transaction_types_id = getTransactionTypeByName(props.transaction_types, selection);
    props.editTransaction(id, inputPayee, Number(inputAmount), Category_id, transaction_types_id);
    setInputPayee("");
    setInputTransactionCategory("");
    setInputAmount("");
    setInputDate("");
    setSelection("");
    setID("");
    handleCloseTransaction();
  };

  return (
    <React.Fragment>
      <IconButton
        aria-label="edit"
        color="primary"
        onClick={() => handleOpenTransaction(props.transaction)}
      >
        <EditIcon
          color="primary"
        />
      </IconButton>

      <Dialog open={openTransaction} onClose={handleCloseTransaction} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">Edit Transactions</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" className={classes.formControl}>
            <h3>Enter Payee</h3>
            <TextField
              id="outlined-secondary"
              label=""
              variant="outlined"
              color="primary"
              defaultValue={inputPayee}
              onChange={handleChangeInputPayee}
            />
            <h3>Select Category</h3>
            <Select
              value={inputTransactionCategory}
              defaultValue={inputTransactionCategory}
              className={classes.inner}
              onChange={handleChangeCategory}
              id="select"
            >
              {
                props.categories.map(category => (<MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>))
              }
            </Select>
            <h3>Enter Amount</h3>
            <TextField
              id="outlined-secondary"
              label="upto 2 decimals "
              variant="outlined"
              color="primary"
              defaultValue={inputAmount}
              onChange={handleChangeInputAmount}
            />
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
            <h3>Select Transaction Type</h3>
            <RadioGroup aria-label="gender" name="gender1" onChange={updateSelection} defaultValue={selection} >
              <FormControlLabel value="Inflow" control={<Radio />} label="Inflow" className={classes.button} />
              <FormControlLabel value="Outflow" control={<Radio />} label="Outflow" className={classes.button} />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={EditTransation} color="primary" className={classes.button}>
            Edit
          </Button>
          <Button onClick={handleCloseTransaction} color="primary" className={classes.button}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}