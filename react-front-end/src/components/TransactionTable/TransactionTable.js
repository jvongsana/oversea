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
import { getCategoryById, getTransactionTypeById, getAmountDollars } from '../../helpers/selectors';
import EditTransaction from "../Buttons/EditTransaction";
import DeleteTransaction from "../Buttons/DeleteTransaction";


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
  formControl: {
    width: 500,
    padding: '0 1em'
  }
}));

export default function TransactionTable(props) {
  console.log(props);
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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.transactions.length - page * rowsPerPage);

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
              {props.transactions && props.transactions.reverse()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow key={transaction.id}>
                      <TableCell >
                        <EditTransaction 
                          transaction={transaction}
                          categories={props.categories}
                          transaction_types={props.transaction_types}
                          editTransaction={props.editTransaction}
                        />
                        <DeleteTransaction 
                          transaction={transaction}
                          deleteTransaction={props.deleteTransaction}
                        />
                        
                      </TableCell>
                      <TableCell id={labelId}>{transaction.payee}</TableCell>
                      <TableCell>{transaction.transaction_date.split('T')[0]}</TableCell>
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