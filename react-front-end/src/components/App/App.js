import React, { useState, useEffect } from 'react';
import Drawer from '../Drawer/Drawer';
import './App.scss';
import { makeStyles } from '@material-ui/core/styles';
import Container from '../Container/Container';
import axios from 'axios';
import { getTransactionsByAccount } from '../../helpers/selectors';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    backgroundColor: "#EFEEEE"
  }
});

export default function App(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    account: "Checking",
    accounts: [],
    categories: [],
    transactions: [],
    transaction_types: []
  });

  const setAccount = account => setState({ ...state, account });
  const transactions = getTransactionsByAccount(state, state.account);

  const renameAccount = (accountName, newAccountName) => {
    const accounts = state.accounts;
    let accountID;

    for (const account of accounts) {
      if (account.name === accountName) {
        accountID = account.id;
      }
    }

    setState({ ...state, account: "" });
    console.log(`Account renamed: ${accountName} => ${newAccountName}`);
    // return axios.put(`/api/accounts/${accountID}`, { newAccountName })
    //   .then(() => {
    //     setState({ ...state, account: "" });
    //     console.log(`Account renamed: ${accountName} => ${newAccountName}`);
    //   });
  };

  const deleteAccount = accountName => {
    const accounts = state.accounts;
    let accountID;

    for (const account of accounts) {
      if (account.name === accountName) {
        accountID = account.id;
      }
    }

    setState({ ...state, account: "" });
    console.log(`Account deleted: ${accountName}`);
    // return axios.delete(`/api/accounts/${accountID}`)
    //   .then(() => {
    //     setState({ ...state, account: "" });
    //     console.log(`Account deleted: ${accountName}`);
    //   });
  };

  useEffect(() => {
    Promise.all([
      axios.get(`/api/accounts`),
      axios.get(`/api/categories`),
      axios.get(`/api/transactions`),
      axios.get(`/api/transaction_types`)
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        accounts: all[0].data,
        categories: all[1].data,
        transactions: all[2].data,
        transaction_types: all[3].data
      }));
    });
  }, []);

  return (
    <div className={classes.container}>
      <Drawer
        accounts={state.accounts}
        account={state.account}
        setAccount={setAccount}
      />
      <Container
        categories={state.categories}
        account={state.account}
        transactions={transactions}
        transaction_type={state.transaction_types}
        onRenameAccount={renameAccount}
        onDeleteAccount={deleteAccount}
      />
    </div>
  );
}