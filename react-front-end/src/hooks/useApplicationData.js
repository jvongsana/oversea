import { useEffect, useReducer } from 'react';
import axios from "axios";
import reducer, {
  SET_ACCOUNT,
  SET_NEW_ACCOUNT,
  SET_APPLICATION_DATA,
  SET_CATEGORY,
  SET_RENAME_ACCOUNT,
  SET_DELETE_ACCOUNT,
  SET_TRANSACTIONS,
  SET_NEW_TRANSACTION
} from "../reducers/application";

export function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    account: "Checking",
    accounts: [],
    categories: [],
    transactions: [],
    transaction_types: []
  });

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


  const setAccount = account => {
    dispatch({
      type: SET_ACCOUNT,
      ...state,
      account
    });
  };


  const addAccount = (user_id, account) => {
    const url = 'http://localhost:8080/api/accounts';
    console.log('userid', user_id);
    console.log('acc', account);
    axios.post(url, { user_id: user_id, name: account })
      .then((res) => {
        const id = res.data;
        dispatch({
          type: SET_NEW_ACCOUNT,
          id,
          user_id,
          account
        });
      })
      .catch((err) => console.log("error is ", err));
  };

  const addCategory = (category) => {
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
    const accounts = [...state.accounts];
    let accountID;

    for (const account of accounts) {
      if (account.name === accountName) {
        accountID = account.id;
        account.name = newAccountName;
      }
    }

    const url = `http://localhost:8080/api/accounts/${accountID}`;
    return axios.put(url, { name: newAccountName })
      .then(() => {
        dispatch({
          type: SET_RENAME_ACCOUNT,
          account: newAccountName,
          accounts
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  const deleteAccount = accountName => {
    const accounts = [...state.accounts];
    let accountID;

    for (const accountIndex in accounts) {
      if (accounts[accountIndex].name === accountName) {
        accountID = accounts[accountIndex].id;
        accounts.splice(accountIndex, 1);
      }
    }

    const url = `http://localhost:8080/api/accounts/${accountID}`;
    return axios.delete(url)
      .then(() => {
        dispatch({
          type: SET_DELETE_ACCOUNT,
          accounts
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  const editTransaction = (id, payee, amount, categoryID, transactionTypeID) => {
    const url = `http://localhost:8080/api/transactions/${id}`;
    const amount_cents = amount * 100;
    return axios.put(url, { payee, amount_cents, categoryID, transactionTypeID })
      .then(() => {
        const transactions = [...state.transactions];

        for (const transaction of transactions) {
          if (transaction.id === id) {
            transaction.payee = payee;
            transaction.amount_cents = amount_cents;
            transaction.category_id = categoryID;
            transaction.transaction_type_id = transactionTypeID;
          }
        }

        dispatch({
          type: SET_TRANSACTIONS,
          transactions
        });
      })
      .catch(err => {
        console.error(err);
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
    return axios.delete(url)
      .then(() => {
        dispatch({
          type: SET_TRANSACTIONS,
          transactions
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  const addTransactions = (data) => {
    let url = 'http://localhost:8080/api/transactions';
    axios.post(url, data)
      .then((res) => {
        dispatch({
          type: SET_NEW_TRANSACTION,
          data
        });
      })
      .catch((err) => console.log("error is", err));
  };

  return {
    state,
    setAccount,
    addAccount,
    addCategory,
    renameAccount,
    deleteAccount,
    editTransaction,
    deleteTransaction,
    addTransactions
  };
}