import React from 'react';
import Drawer from '../Drawer/Drawer';
import './App.scss';
import { makeStyles } from '@material-ui/core/styles';
import { getTransactionsByAccount } from '../../helpers/selectors';
import { useApplicationData } from "../../hooks/useApplicationData";
import AccountReport from '../AccountReport/AccountReport';
import TransactionTable from '../TransactionTable/TransactionTable';
import AccountSettings from '../AccountSettings/AccountSettings';
import AddCategory from '../Buttons/AddCategory';
import AddTransactions from '../Buttons/AddTransactions';
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
    renameCategory,
    deleteCategory,
    addTransactions,
    addAccount,
    renameAccount,
    deleteAccount,
    editTransaction,
    deleteTransaction,
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
            transactions={state.transactions}
            categories={state.categories}
            addCategory={addCategory}
            renameCategory={renameCategory}
            deleteCategory={deleteCategory}
          />
        </div>
        : <div className="mainContainer">
          <AccountReport
            account={state.account}
            transactions={transactions}
            categories={state.categories}
          />
          <div className="button-section">
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
          </div>
          <TransactionTable
            account={state.account}
            transactions={transactions}
            categories={state.categories}
            transaction_types={state.transaction_types}
            editTransaction={editTransaction}
            deleteTransaction={deleteTransaction}
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