import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container as Partial } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
<<<<<<< HEAD
import AccountReport  from './AccountReport/AccountReport';
import TransactionTable from './TransactionTable/TransactionTable';
=======
import Dashboard from '../Dashboard/Dashboard';
import AccountReport from '../AccountReport/AccountReport';
import TransactionTable from '../TransactionTable/TransactionTable';
>>>>>>> 00db7207fc8d155ca49b25950c528921e0144e7a
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

  return (
    <React.Fragment>
      <CssBaseline />
      <Partial maxWidth="xl" className={classes.partial}>
          <Dashboard />
          <AccountReport 
            account={props.account}
            transactions={props.transactions}
            categories={props.categories}
            transaction_types={props.transaction_type}
          />
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