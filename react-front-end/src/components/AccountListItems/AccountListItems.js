import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { getAccountBalance } from '../../helpers/selectors';


const useStyles = makeStyles({
  button: {
    padding: '10px',
    backgroundColor: '#01234c',
    borderRadius: '10px',

    "&:hover": {
      backgroundColor: '#a6d0ef',
      padding: '10px',
      borderRadius: '20px'
    }
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
          <ListItemText primary={getAccountBalance(props.transactions, props.accounts, account.name)} />
        </ListItem>
      ))}
    </List>
  );
}

export default AccountListItems;