import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './AccountReport.scss';
import { Container } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import ProgressBar from './ProgressBars/ProgressBar';

const useStyles = makeStyles({
  partial: {
    backgroundColor: '#a6d0ef',
    height: 'auto',
    width: '80vw',
    borderRadius: '20px',
    padding: '24px 48px 48px 48px'
  },
  progressBar: {
    padding: '0 36px 0 36px'
  }
});

const testData = [
  { bgcolor: "#6a1b9a", completed: 60 },
  { bgcolor: "#00695c", completed: 30 },
  { bgcolor: "#ef6c00", completed: 53 },
];

export default function AccountReport() {
  const classes = useStyles();
  
  return (
    <Container maxWidth="xl" className={classes.partial} >
      <CssBaseline />
      <h1>Account Report Filler Text</h1>
      {testData.map((item, idx) => (
        <div className={classes.progressBar}>
          <p>Category Name</p>
          <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
        </div>
      ))}
    </Container>
  );
}