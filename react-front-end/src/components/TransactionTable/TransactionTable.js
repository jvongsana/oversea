import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './TransactionTable.scss';
import { Container } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  partial: {
    backgroundColor: '#a6d0ef',
    height: 'auto',
    width: '80vw',
    marginTop: '4em',
    padding: '24px 48px 48px 48px',
    borderRadius: '20px'
  }
});

export default function AccountReport() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" className={classes.partial} >
        <h1>Transaction Table Filler Text</h1>
        
      </Container>
    </React.Fragment>
  );
}