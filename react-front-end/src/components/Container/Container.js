import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container as Partial } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import AccountReport  from './AccountReport/AccountReport';
import TransactionTable from './TransactionTable/TransactionTable';
import './Container.scss';

const useStyles = makeStyles({
  partial: {
    backgroundColor: '#EFEEEE',
    height: '90vh', 
    marginTop: '6em'
  }
});

export default function Container(props) {
  const classes = useStyles();
  console.log(props)
  return (
    <React.Fragment>
      <CssBaseline />
      <Partial maxWidth="xl" className={classes.partial}>
          <AccountReport />
          <TransactionTable 
            account={props.account}
            transactions={props.transactions}
            categories={props.categories}
            transaction_types={props.transaction_type}
          />
      </Partial>
    </React.Fragment>
  );
}