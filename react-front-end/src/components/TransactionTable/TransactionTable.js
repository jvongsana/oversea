import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from "@material-ui/icons/Delete";
import { getCategoryById, getTransactionTypeById, getAmountDollars } from '../../helpers/selectors';
import { useApplicationData } from "../../hooks/useApplicationData";
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
import { getCategoryByName, getTransactionTypeByName, getAccountByName } from '../../helpers/selectors';


const headCells = [
  { id: 'Edit/Delete', numeric: false, disablePadding: false, label: 'Edit/Delete' },
  { id: 'payee', numeric: false, disablePadding: false, label: 'Payee' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
  { id: 'transaction_type', numeric: false, disablePadding: false, label: 'Transaction Type' },
  { id: 'amount', numeric: false, disablePadding: false, label: 'Amount' }
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: '3em'
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
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
}));

const INFLOW = 1;
const OUTFLOW = 2;

export default function TransactionTable(props) {
  
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const {editTransaction, deleteTransaction} = useApplicationData();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // state for transcation id
  const [id, setID] = useState("");
  
  const handleID = (event) => {
    setID(event.target.value);
  };
  

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

    const Amount = getAmountDollars(transaction.amount_cents)
    setInputAmount(Amount);

    const formatYmd = date => date.slice(0, 10);
    let d = transaction.transaction_date;
    const formatedDate = formatYmd(d);  
    setInputDate(formatYmd(transaction.transaction_date));

    const transactionTypeName =  getTransactionTypeById(props.transaction_types, transaction.transaction_type_id);
    setSelection(transactionTypeName);

    setID(transaction.id);

    
  };

  const handleCloseTransaction = () => {
   
    setOpenTransaction(false);
    setInputPayee("");
    setInputTransactionCategory("");
    setInputAmount("");
    setInputDate("");
    setSelection("");
    setID("");


  };


  
  const EditTransation = () => {
    const Category_id = getCategoryByName(props.categories, inputTransactionCategory);
    const transaction_types_id = getTransactionTypeByName(props.transaction_types, selection);
    editTransaction(id, inputPayee, Number(inputAmount), Category_id, transaction_types_id);
    handleCloseTransaction();

  }

 
  
  
    

  

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, props.transactions.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <TableHead>
              <TableRow>
                {
                  headCells.map(headCell =>
                    (
                      <TableCell key={headCell.id} classes={{ head: classes.head }}>{headCell.label}</TableCell>
                    )
                  )
                }
                
              </TableRow>
            </TableHead>
            <TableBody>
              {props.transactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  console.log("t", transaction.payee);
                  return (
                    <TableRow key={transaction.id}>
                      
                      
                        <TableCell >
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClick={() => handleOpenTransaction(transaction)}
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
                                  props.categories.map(category => (<MenuItem  key={category.id} value={category.name}>{category.name}</MenuItem>))
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
                              <RadioGroup aria-label="gender" name="gender1" onChange={updateSelection} defaultValue={selection}>
                                <FormControlLabel value="Inflow" control={<Radio />} label="Inflow" className={classes.button} />
                                <FormControlLabel value="Outflow" control={<Radio />} label="Outflow" className={classes.button} />
                              </RadioGroup>

                                
                                      
                            </FormControl>
                              
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleCloseTransaction} color="primary" className={classes.button}>
                                Cancel
                                </Button>
                              <Button onClick={EditTransation} color="primary" className={classes.button}>
                                Add
                              </Button>
                            </DialogActions>
                          </Dialog>


                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={() => deleteTransaction(transaction.id)}
                        >
                          <DeleteIcon color="secondary" />
                        </IconButton>
                      </TableCell>
                      <TableCell id={labelId}>{transaction.payee}</TableCell>
                      <TableCell>Date Filler</TableCell>
                      <TableCell>{getCategoryById(props.categories, transaction.category_id)}</TableCell>
                      <TableCell>{getTransactionTypeById(props.transaction_types, transaction.transaction_type_id)}</TableCell>
                      <TableCell>${getAmountDollars(transaction.amount_cents)}</TableCell>
                      
                      
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}