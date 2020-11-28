import React from 'react';
import './Drawer.scss';
import { Drawer as Sidebar } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import AccountListItems from '../AccountListItems/AccountListItems';
import AddAccount from '../Buttons/AddAccount'

const useStyles = makeStyles({
  drawer: {
    width: '240px',
    color: 'white'
  },
  paper: {
    backgroundColor: '#01234c',
    width: '240px',
    textAlign: 'center'
  }
});


function Drawer(props) {
  const classes = useStyles();

  return (
    <Sidebar variant="permanent" className={classes.drawer} classes={{ paper: classes.paper }}>
      <img
        className="logo--centered"
        src={require('../../images/logo-white.png')}
        alt="Interview Scheduler"
        width="100px"
        height="100px"
      />
      <AccountListItems
        accounts={props.accounts}
        transactions={props.transactions}
        setAccount={props.setAccount}
        openDashboard={props.openDashboard}
      />
      <AddAccount
        addAccount={props.addAccount}
      />
    </Sidebar>
  );
}

export default Drawer;