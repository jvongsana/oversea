import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { getAccountBalance } from '../../helpers/selectors';

// #01234c

const useStyles = makeStyles({
  button: {
    padding: '10px',
    width: '220px',
    backgroundColor: '#334e6f',
    borderRadius: '20px',
    margin: '10px 0 10px 10px',
    "&:hover": {
      backgroundColor: '#a6d0ef',
      padding: '10px',
      borderRadius: '20px'
    }
  },
  balance: {
    textAlign: 'right'
  }
});

function AccountListItems(props) {
  const classes = useStyles();

  return (
    <List>
      <ListItem button 
        key="root" 
        classes={{ root: classes.button }} 
        onClick={() => 
          props.openDashboard(true)
        }
      >
        <ListItemText primary="Dashboard" />
      </ListItem>
      {props.accounts.map((account) => (
        <ListItem button 
          key={account.id} 
          classes={{ root: classes.button }} 
          onClick={() => { 
            props.setAccount(account.name);
            props.openDashboard(false);
          }}
        >
          <ListItemText primary={account.name} />
          <ListItemText className={classes.balance} primary={getAccountBalance(props.transactions, props.accounts, account.name)} />
        </ListItem>
      ))}
    </List>
  );
}

export default AccountListItems;