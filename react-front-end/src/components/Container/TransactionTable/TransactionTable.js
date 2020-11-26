import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './TransactionTable.scss';
import { Container, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { getCategoryById, getTransactionTypeById, getAmountDollars } from '../../../helpers/selectors';
import AddCategories from '../../AddCategories/AddCategories';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  partial: {
    backgroundColor: '#a6d0ef',
    height: 'auto',
    width: '80vw',
    marginTop: '4em',
    padding: '24px 48px 48px 48px',
    borderRadius: '20px'
  },
  root: {
    backgroundColor: 'white',
    borderRadius: '20px',
    marginTop: '24px'
  },
  head: {
    fontWeight: '700'
  }
});

const headCells = [
  { id: 'payee', label: 'Payee' },
  { id: 'category', label: 'Category' },
  { id: 'transaction_type', label: 'Transaction Type' },
  { id: 'amount', label: 'Amount' }
];

const INFLOW = 1;
const OUTFLOW = 2;

export default function AccountReport(props) {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.partial} >
      <CssBaseline />
      <h1>{props.account} Transactions</h1>
      {/* <AddTransaction /> */}
      <AddCategories />
      <Table className={classes.root}>
        <TableHead>
          <TableRow>
            {
              headCells.map(headCell =>
                (
                  <TableCell key={headCell.id} classes={{ head: classes.head }}>{headCell.label}</TableCell>
                )
              )
            }
            <TableCell classes={{ head: classes.head }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.transactions.map(transaction =>
              (<TableRow key={transaction.id}>
                <TableCell>{transaction.payee}</TableCell>
                <TableCell>{getCategoryById(props.categories, transaction.category_id)}</TableCell>
                <TableCell>{getTransactionTypeById(props.transaction_types, transaction.transaction_type_id)}</TableCell>
                <TableCell>{getAmountDollars(transaction.amount_cents)}</TableCell>
                <TableCell >
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    onClick={() => props.onEdit(transaction.id, "Test Kitchen", 13.37, 1, INFLOW)}
                  >
                    <EditIcon
                      color="primary"
                    />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={() => props.onDelete(transaction.id)}
                  >
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </TableCell>
              </TableRow>
              )
            )
          }
        </TableBody>
      </Table>
    </Container>
  );
}