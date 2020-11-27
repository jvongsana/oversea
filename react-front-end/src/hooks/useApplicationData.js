import { useEffect, useReducer } from 'react';
import axios from "axios";
import reducer, {
  SET_ACCOUNT,
  SET_NEW_ACCOUNT,
  SET_APPLICATION_DATA,
  SET_CATEGORY,
  SET_RENAME_ACCOUNT,
  SET_DELETE_ACCOUNT,
  SET_TRANSACTIONS
} from "../reducers/application";

export function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    account: "Checking",
    accounts: [],
    categories: [],
    transactions: [],
    transaction_types: []
  });

  const setAccount = account => {
    dispatch({
      type: SET_ACCOUNT,
      ...state,
      account
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get(`/api/accounts`),
      axios.get(`/api/categories`),
      axios.get(`/api/transactions`),
      axios.get(`/api/transaction_types`)
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        accounts: all[0].data,
        categories: all[1].data,
        transactions: all[2].data,
        transaction_types: all[3].data
      });
    });
  }, []);

  const addAccount = (user_id, account) => {
    const url = 'http://localhost:8080/api/accounts';
    axios.post(url, { user_id: user_id, name: account })
      .then((res) => {
        dispatch({
          type: SET_NEW_ACCOUNT,
          user_id,
          account
        });
      })
      .catch((err) => console.log("error is ", err));
  };

  const addCategory = (category) => {
    console.log('category', category);
    let url = 'http://localhost:8080/api/categories';
    axios.post(url, { name: category })
      .then((res) => {
        dispatch({
          type: SET_CATEGORY,
          category
        });
      })
      .catch((err) => console.log("error is ", err));
  };

  const renameAccount = (accountName, newAccountName) => {
    // const accounts = [...state.accounts];
    const accounts = state.accounts.map(item => item);
    console.log('accounts before:', accounts);
    let accountID = 2;

    // for (const account of accounts) {
    //   if (account.name === accountName) {
    //     console.log('hello');
    //     accountID = account.id;
    //     account.name = newAccountName;
    //   }
    // }

    console.log('accounts after:', accounts);

    const url = `http://localhost:8080/api/accounts/${accountID}`;
    return axios.put(url, { name: newAccountName })
      .then(() => {
        console.log(`Account renamed: ${accountName} => ${newAccountName}`);
        dispatch({
          type: SET_RENAME_ACCOUNT,
          account: newAccountName,
          accounts
        });
      })
      .catch((err) => {
        console.log('state from error:', state);
        console.log("Error is:", err);
      });
  };

  const deleteAccount = accountName => {
    const accounts = [...state.accounts];
    let accountID;
    console.log('before deletion:', accounts);

    for (let accountIndex in accounts) {
      console.log('accountIndex :', accountIndex);
      if (accounts[accountIndex].name === accountName) {
        accountID = accounts[accountIndex].id;
        accounts.splice(accountIndex, 1);
        console.log('right after deletion:', accounts);
      }
    }

    console.log('after deletion:', accounts);
    const url = `http://localhost:8080/api/accounts/${accountID}`;
    return axios.delete(url)
      .then(() => {
        console.log(`Account deleted: ${accountName}`);
        dispatch({
          type: SET_DELETE_ACCOUNT,
          accounts
        });
      });
  };

  const editTransaction = (id, payee, amount, categoryID, transactionTypeID) => {
    const transactions = [...state.transactions];

    for (const transaction of transactions) {
      if (transaction.id === id) {
        transaction.payee = payee;
        transaction.amount_cents = amount * 100;
        transaction.category_id = categoryID;
        transaction.transaction_type_id = transactionTypeID;
      }
    }

    const url = `http://localhost:8080/api/transactions/${id}`;
    return axios.put(url, { payee, amount, categoryID, transactionTypeID })
      .then(() => {
        dispatch({
          type: SET_TRANSACTIONS,
          transactions
        });
        console.log(`Transaction id: ${id} edited payee to: ${payee}, amount to: ${amount * 100}, category_id to: ${categoryID}, transaction_type_id to: ${transactionTypeID}`);
      });
  };

  const deleteTransaction = id => {
    const transactions = [...state.transactions];

    for (let transactionIndex in transactions) {
      if (transactions[transactionIndex].id === id) {
        transactions.splice(transactionIndex, 1);
      }
    }

    const url = `http://localhost:8080/api/transactions/${id}`;
    return axios.put(url)
      .then(() => {
        dispatch({
          type: SET_TRANSACTIONS,
          transactions
        });
        console.log(`Transaction id: ${id} deleted.`);
      });
  };

  return {
    state,
    setAccount,
    addAccount,
    addCategory,
    renameAccount,
    deleteAccount,
    editTransaction,
    deleteTransaction
  };
}