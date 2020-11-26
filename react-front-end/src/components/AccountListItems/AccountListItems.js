import React from 'react';
import {  
  List, 
  ListItem,
  ListItemText,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  button: {
    padding: '10px',
    backgroundColor:'#01234c',
    borderRadius: '10px',
    textAlign: 'center',
    "&:hover": {
      backgroundColor: '#a6d0ef',
      padding: '10px',
      borderRadius: '20px'
    }
  }
});
console.log('rerender list')
function AccountListItems(props) {
  const classes = useStyles();
console.log('a props', props)
  return ( 
      <List>
        <ListItem button key="root" classes={{ root: classes.button }} >
          <ListItemText primary="Dashboard" />
        </ListItem>
        {props.accounts.map((account) => (
          <ListItem button key={account.id} classes={{ root: classes.button }} onClick={() => props.setAccount(account.name)}>
            <ListItemText primary={account.name} />
        </ListItem>
        ))}
      </List>
  );
}

export default AccountListItems;