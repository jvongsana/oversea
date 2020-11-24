import React, { useState } from 'react';
import Drawer from '../Drawer/Drawer';
import './App.scss';
import { makeStyles } from '@material-ui/core/styles';
import Container from '../Container/Container';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    backgroundColor: "#EFEEEE"
  }
});

export default function App() {
  const [account, setAccount] = useState("Checkings")
  const classes = useStyles();
  const accounts = [
    {"id":1,"user_id":1,"name":"Saving"},
    {"id":2,"user_id":1,"name":"Checking"},
    {"id":3,"user_id":1,"name":"Credit Card"}
  ];

  return (
      <div className={classes.container}>
        <Drawer 
          accounts={accounts}
          account={account}
          setAccount={setAccount}
        />
        <Container account={account}/>
      </div>
     
    );
}