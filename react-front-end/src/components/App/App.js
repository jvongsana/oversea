import React from 'react';
import Drawer from '../Drawer/Drawer';
import './App.scss';
import { makeStyles } from '@material-ui/core/styles';
import Container from '../Container/Container';
// import axios from 'axios';
import { getTransactionsByAccount } from '../../helpers/selectors'
import {useApplicationData} from "../../hooks/useApplicationData";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    backgroundColor: "#EFEEEE"
  }
});

export default function App(props) {
  const classes = useStyles();
  const {
    state,
    setAccount
  } = useApplicationData()
  
  const transactions = getTransactionsByAccount(state, state.account);

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
        />
      </div>
     
    );
}