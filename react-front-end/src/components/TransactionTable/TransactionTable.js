import React from "react";
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
                <TableCell>Actions</TableCell>
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
                          onClick={() => handleOpenTransaction()}
                        >
                          <EditIcon
                            color="primary"
                          />
                        </IconButton>
                        
                    
                          <Dialog open={openTransaction} onClose={handleCloseTransaction} aria-labelledby="form-dialog-title" >
                            <DialogTitle id="form-dialog-title">Edit Transactions</DialogTitle>
                            <DialogContent>
                            <FormControl component="fieldset" className={classes.formControl}>
                            <h3>{transaction.id}</h3>
                              
                                <TextField
                                  id="outlined-secondary"
                                  variant="outlined"
                                  color="primary"
                                  defaultValue={transactionName(transaction)}
                                  onChange={handleChangeInputPayee}
                                />
                               
                                
                              </FormControl>
                              
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleCloseTransaction} color="primary" className={classes.button}>
                                Cancel
                                </Button>
                              <Button onClick={handleCloseTransaction} color="primary" className={classes.button}>
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
                      <TableCell >
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClick={() => props.editTransaction(transaction.id, "Church's Chicken", 13.37, 1, INFLOW)}
                        >
                          <EditIcon
                            color="primary"
                          />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={() => props.deleteTransaction(transaction.id)}
                        >
                          <DeleteIcon color="secondary" />
                        </IconButton>
                      </TableCell>
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