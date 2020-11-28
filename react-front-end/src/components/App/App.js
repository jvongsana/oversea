import React from 'react';
import Drawer from '../Drawer/Drawer';
import './App.scss';
import { makeStyles } from '@material-ui/core/styles';
import { getTransactionsByAccount } from '../../helpers/selectors';
import { useApplicationData } from "../../hooks/useApplicationData";
import AccountReport from '../AccountReport/AccountReport';
import TransactionTable from '../TransactionTable/TransactionTable';
import AccountSettings from '../AccountSettings/AccountSettings';
<<<<<<< HEAD
import { getCategoryByName, getTransactionTypeByName, getAccountByName } from '../../helpers/selectors';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { Select, MenuItem } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
=======
import AddCategory from '../Buttons/AddCategory';
import AddTransactions from '../Buttons/AddTransactions';
>>>>>>> master
import Dashboard from '../Dashboard/Dashboard';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: "#EFEEEE"
  },
  partial: {
    backgroundColor: '#EFEEEE',
    height: '90vh',
    marginTop: '6em'
  }
});

export default function App(props) {
  const {
    state,
    setAccount,
    addCategory,
    addTransactions,
    addAccount,
    renameAccount,
    deleteAccount,
    openDashboard
  } = useApplicationData();

  const classes = useStyles();
  const transactions = getTransactionsByAccount(state, state.account);

  return (
    <div key="sidebar" className={classes.container}>
      <Drawer
        transactions={state.transactions}
        accounts={state.accounts}
        account={state.account}
        setAccount={setAccount}
        addAccount={addAccount}
        openDashboard={openDashboard}
      />
      { state.dashboard
        ? <div className="mainContainer">
          <Dashboard

          />
        </div>
        : <div className="mainContainer">
          <AccountReport
            account={state.account}
            transactions={transactions}
            categories={state.categories}
          />
          <AddCategory
            addCategory={addCategory}
          />
          <AddTransactions
            addTransactions={addTransactions}
            transactions={state.transactions}
            accounts={state.accounts}
            account={state.account}
            categories={state.categories}
            transaction_types={state.transaction_types}
          />
          <TransactionTable
            account={state.account}
            transactions={transactions}
            categories={state.categories}
            transaction_types={state.transaction_types}
          />
          <AccountSettings
            account={state.account}
            renameAccount={renameAccount}
            deleteAccount={deleteAccount}
          />
        </div>
      }
    </div>

  );
}