import {useEffect, useReducer } from 'react';
import axios from "axios";
import reducer, {
  SET_ACCOUNT,
  SET_NEW_ACCOUNT,
  SET_APPLICATION_DATA,
  SET_CATEGORY,
  SET_TRANSACTION,
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
    })
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
  }

  const addCategory = (category) => { 
    console.log('category', category)
    let url = 'http://localhost:8080/api/categories';
    axios.post(url, {name: category})
    .then((res) => {
      dispatch({
        type: SET_CATEGORY,
        category
      });
    })
    .catch((err) => console.log("error is ", err));
   
  }

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
  }

  return {
    state,
    setAccount,
    addAccount,
    addCategory,
    addTransactions
  };
}