import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './TransactionTable.scss';
import { Container, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { getCategoryById, getTransactionTypeById, getAmountDollars } from '../../../helpers/selectors'
import AddCategories from '../../AddCategories/AddCategories';
import AddTransactions from '../../AddTransactions/AddTransactions'

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
    fontWeight:'700'
  }
});

const headCells = [
  { id: 'payee', label: 'Payee' },
  { id: 'category', label: 'Category' },
  { id: 'transaction_type', label: 'Transaction Type' },
  { id: 'amount', label: 'Amount' }
]

export default function AccountReport(props) {
  const classes = useStyles();
   
  return (
      <Container maxWidth="xl" className={classes.partial} >
        <CssBaseline />
        <h1>{props.account} Transactions</h1>
        <AddTransactions categories={props.categories} transaction_types={props.transaction_types} account={props.account} accounts={props.accounts}/> 
        <AddCategories />
         <Table className={classes.root}>
            <TableHead>
              <TableRow>
              {
                headCells.map(headCell => 
                  (
                    <TableCell key={headCell.id} classes={{head: classes.head}}>{headCell.label}</TableCell>
                  )
                )
              }
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
                </TableRow>
                )
              )
            }
          </TableBody>
         </Table>
      </Container>
  );
}