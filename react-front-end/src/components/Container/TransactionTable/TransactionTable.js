import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './TransactionTable.scss';
import { Container, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';


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
    borderRadius: '20px'
  },
  head: {
    fontWeight:'700'
  }
});

function createData(id, payee, category, transaction_type, amount) {
  return { id, payee, category, transaction_type, amount };
}

const rows = [
  createData(1, 'Mc Donald\'s', 'Restaurants', 'Outflow', 10.49),
  createData(2, 'Wal-Mart', 'Groceries', 'Outflow', 34.63),
  createData(3, 'Shopper\'s Drug Mart', 'Household', 'Outflow', 9.94),
  createData(4, 'Yogen Fruz', 'Restaurants', 'Outflow', 7.64),
  createData(5, 'Superstore', 'Groceries', 'Outflow', 103.92),
  createData(6, 'H&M', 'Clothing', 'Outflow', 7.38),
  createData(7, 'Uniqlo', 'Income', 'Inflow', 924.28),
  createData(8, 'Apple', 'Electronics', 'Inflow', 2431,51),
  createData(9, 'Samsung', 'Electronics', 'Outflow', 213,42),
  createData(10, 'Amazon', 'Household', 'Outflow', 19.99)
];

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
        <h1>Transaction Table Filler Text</h1>
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
              rows.map(item => 
                (<TableRow key={item.id}>
                  <TableCell>{item.payee}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.transaction_type}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                </TableRow>
                )
              )
            }
          </TableBody>
         </Table>
      </Container>
  );
}