import { useEffect, useReducer } from 'react';
import axios from "axios";
import reducer, {
  SET_ACCOUNT,
  SET_NEW_ACCOUNT,
  SET_APPLICATION_DATA,
  SET_NEW_CATEGORIES,
  SET_CATEGORIES,
  SET_RENAME_ACCOUNT,
  SET_DELETE_ACCOUNT,
  SET_TRANSACTIONS,
  SET_NEW_TRANSACTION,
  SET_DASHBOARD
} from "../reducers/application";

export function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    account: "Checking",
    accounts: [],
    categories: [],
    transactions: [],
    transaction_types: [],
    dashboard: true
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
    const url = '/api/accounts';
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
      .catch(err => {
        console.error(err);
      });
  };

  const addCategory = name => {
    const url = '/api/categories';
    axios.post(url, { name })
      .then((res) => {
        const id = res.data;
        const newCategory = { id, name };
        const categories = [...state.categories, newCategory];

        dispatch({
          type: SET_NEW_CATEGORIES,
          categories
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  const renameCategory = (id, name) => {
    const url = `/api/categories/${id}`;
    return axios.put(url, { name })
      .then(() => {
        const categories = [...state.categories];

        for (const categoryIndex in categories) {
          if (categories[categoryIndex].id === id) {
            categories[categoryIndex] = {
              ...categories[categoryIndex],
              name
            };
          }
        }

        dispatch({
          type: SET_CATEGORIES,
          categories
        });
      });
  };

  const deleteCategory = id => {
    const url = `/api/categories/${id}`;

    return axios.delete(url)
      .then(() => {
        const categories = [...state.categories];
        const transactions = [...state.transactions];

        for (const categoryIndex in categories) {
          if (categories[categoryIndex].id === id) {
            categories.splice(categoryIndex, 1);
          }
        }

        for (const transactionIndex in transactions) {
          if (transactions[transactionIndex].category_id === id) {
            transactions.splice(transactionIndex, 1);
          }
        }

        dispatch({
          type: SET_CATEGORIES,
          categories,
          transactions
        });
      });
  };

  const renameAccount = (accountName, newAccountName) => {
    const accounts = [...state.accounts];
    let accountID;

    for (const accountIndex in accounts) {
      if (accounts[accountIndex].name === accountName) {
        accountID = accounts[accountIndex].id;
        accounts[accountIndex] = {
          ...accounts[accountIndex],
          name: newAccountName
        };
      }
    }

    const url = `/api/accounts/${accountID}`;
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

    const url = `/api/accounts/${accountID}`;
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
    const url = `/api/transactions/${id}`;
    const amount_cents = amount * 100;
    return axios.put(url, { payee, amount_cents, categoryID, transactionTypeID })
      .then(() => {
        const transactions = [...state.transactions];

        for (const transactionIndex in transactions) {
          if (transactions[transactionIndex].id === id) {
            transactions[transactionIndex] = {
              ...transactions[transactionIndex],
              payee,
              amount_cents,
              category_id: categoryID,
              transaction_type_id: transactionTypeID
            };
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

    for (const transactionIndex in transactions) {
      if (transactions[transactionIndex].id === id) {
        transactions.splice(transactionIndex, 1);
      }
    }

    const url = `/api/transactions/${id}`;
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
    let url = '/api/transactions';
    axios.post(url, data)
      .then((res) => {
        dispatch({
          type: SET_NEW_TRANSACTION,
          data
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  const openDashboard = (open) => {
    dispatch({
      type: SET_DASHBOARD,
      ...state,
      open
    });
  };

  return {
    state,
    setAccount,
    addAccount,
    addCategory,
    renameCategory,
    deleteCategory,
    renameAccount,
    deleteAccount,
    editTransaction,
    deleteTransaction,
    addTransactions,
    openDashboard
  };
}