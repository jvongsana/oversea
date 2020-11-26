import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from "axios";
import './AddTransactions.scss';
import { getCategoryByName,getTransactionTypeByName,getAccountByName} from '../../helpers/selectors';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import {Select, MenuItem,InputLabel} from "@material-ui/core";

export default function AddTransactions(props) {
  
  const useStyles = makeStyles({
  
    button: {
      float: 'right',
      backgroundColor:'#01234c',
      "&:hover": {
        backgroundColor: '#a6d0ef'
      }
    },
    formControl: {
      width: 500,
      padding: '0 1em'
    },
    radioButton: {
      backgroundColor:'#01234c',
      "&:hover": {
        backgroundColor: '#a6d0ef'
      }
    }
  });
  const [open, setOpen] = useState(false);

  //handling open functionality for popup modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  
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
  const [inputCategorie, setInputcategorie] = React.useState("");
  const handleChangeCategory = event => {
    setInputcategorie(event.target.value);
  };
  
  // state for datepicker
  const [inputDate, setInputDate] = React.useState("");
  const handleDateChange = event => {
    setInputDate(event.target.value);
  }
  

  const Category_id = getCategoryByName(props.categories, inputCategorie);
  const transaction_types_id = getTransactionTypeByName(props.transaction_types,selection);
  const account_id = getAccountByName(props.accounts,props.account);
  

  //handling close functionality for popup modal
  const handleClose = () => {
    setInputcategorie("")
    setOpen(false);
  };


  //function to add transaction to db
  const addTransactions = () => {
    
    let url = 'http://localhost:8080/api/transactions';
    let data = {
       category_id:Category_id,
       account_id:account_id,
       transaction_type_id:transaction_types_id, 
       payee:inputPayee,
       amount_cents:Number(inputAmount)
    };
    
    axios.post(url, {data})
    .then((res) => {
      setInputAmount("");
      setInputPayee("");
      setInputcategorie("");
      setSelection("");
      handleClose();
    })
    .catch((err) => console.log("error is ", err));
    
   
  }
  
  
  const classes = useStyles();
  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} className={classes.button}>
       + Transactions
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
                props.categories.map(category => (<MenuItem value={category.name}>{category.name}</MenuItem>))
              }
              
            </Select>
            
            <h3>Select Transaction Type</h3>
            <RadioGroup aria-label="gender" name="gender1"  onChange={updateSelection}>
              <FormControlLabel value="Inflow" control={<Radio />} label="Inflow" className={classes.radioButton}/>
              <FormControlLabel value="Outflow" control={<Radio />} label="Outflow" className={classes.radioButton} />
            </RadioGroup>

            <h4>Date</h4>
            <TextField
              id="date"
              label="Transaction Date"
              type="date"
              defaultValue="2017-05-24"
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
          <Button onClick={addTransactions} color="primary" className={classes.button}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
  
}
