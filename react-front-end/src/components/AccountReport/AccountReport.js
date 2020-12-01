import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProgressBar from './ProgressBars/ProgressBar';
import { getPercentCategoryExpense } from '../../helpers/selectors';

const useStyles = makeStyles({
  partial: {
    backgroundColor: '#a6d0ef',
    height: 'auto',
    width: '83vw',
    borderRadius: '20px',
    padding: '24px 48px 48px 48px'
  },
  progressBar: {
    padding: '0 36px 0 36px'
  }
});

const color = '#4a91bb';

export default function AccountReport(props) {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.partial} >
      <CssBaseline />
      <h1>{props.account} Account Expense Report</h1>
      {props.categories.map((category) => (
        <div className={classes.progressBar} key={category.id}>
          <p>{category.name}</p>
          <ProgressBar bgcolor={color} completed={getPercentCategoryExpense(props.transactions, category)} />
        </div>
      ))}
    </Container>
  );
}