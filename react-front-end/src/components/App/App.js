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
    const accounts = { ...state.accounts };
    let accountID;

    for (const account of accounts) {
      if (account.name === accountName) {
        accountID = account.id;
        account.name = newAccountName;
      }
    }

    setState(prev => ({ ...prev, account: newAccountName }));
    console.log(`Account renamed: ${accountName} => ${newAccountName}`);
    // return axios.put(`/api/accounts/${accountID}`, { newAccountName })
    //   .then(() => {
    //     setState({ ...state, account: "" });
    //     console.log(`Account renamed: ${accountName} => ${newAccountName}`);
    //   });
  };

  const deleteAccount = accountName => {
    const accounts = { ...state.accounts };
    let accountID;

    for (let account of accounts) {
      if (account.name === accountName) {
        accountID = account.id;
        account = null;
      }
    }

    setState(prev => ({ ...prev, account: "" }));
    console.log(`Account deleted: ${accountName}`);
    // return axios.delete(`/api/accounts/${accountID}`)
    //   .then(() => {
    //     setState({ ...state, account: "" });
    //     console.log(`Account deleted: ${accountName}`);
    //   });
  };

  const editTransaction = (id, payee, amount, categoryID, transactionTypeID) => {
    const transactions = { ...state.transactions };

    for (const transaction of transactions) {
      if (transaction.id === id) {
        transaction.payee = payee;
        transaction.amount_cents = amount * 100;
        transaction.category_id = categoryID;
        transaction.transaction_type_id = transactionTypeID;
      }
    }

    setState(prev => ({ ...prev, transactions }));
    console.log(`Transaction id: ${id} edited payee to: ${payee}, amount to: ${amount * 100}, category_id to: ${categoryID}, transaction_type_id to: ${transactionTypeID}`);
    // return axios.put(`/api/transactions/${id}`, { payee, amount, categoryID, transactionTypeID })
    //   .then(() => {
    //     const transactions = { ...state.transactions };

    //     for (const transaction of transactions) {
    //       if (transaction.id === id) {
    //         transaction.payee = payee;
    //         transaction.amount_cents = amount * 100;
    //         transaction.category_id = categoryID;
    //         transaction.transaction_type_id = transactionTypeID;
    //       }
    //     }

    //     setState(prev => ({ ...prev, transactions }));
    //     console.log(`Transaction id: ${id} edited payee to: ${payee}, amount to: ${amount * 100}, category_id to: ${categoryID}, transaction_type_id to: ${transactionTypeID}`);
    //   });
  };

  const deleteTransaction = id => {
    const transactions = { ...state.transactions };

    for (let transaction of transactions) {
      if (transaction.id === id) {
        transaction = null;
      }
    }

    setState(prev => ({ ...prev, transactions }));
    console.log(`Transaction id: ${id} deleted.`);
    // return axios.put(`/api/transactions/${id}`)
    //   .then(() => {
    //     const transactions = { ...state.transactions };

    //     for (let transaction of transactions) {
    //       if (transaction.id === id) {
    //         transaction = null;
    //       }
    //     }

    //     setState(prev => ({ ...prev, transactions }));
    //     console.log(`Transaction id: ${id} deleted.`);
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
        onEditTransaction={editTransaction}
        onDeleteTransaction={deleteTransaction}
        onRenameAccount={renameAccount}
        onDeleteAccount={deleteAccount}
      />
    </div>
  );
}