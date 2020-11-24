import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core/';
import { PieChart } from 'react-minimal-pie-chart';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  partial: {
    backgroundColor: '#a6d0ef',
    height: '100vh',
    width: '80vw',
    borderRadius: '20px',
    padding: '24px 48px 48px 48px'
  }
});

const testData = [
  { bgcolor: "#6a1b9a", categoryName: "Groceries", completed: 60.27 },
  { bgcolor: "#00695c", categoryName: "Rent", completed: 30.65 },
  { bgcolor: "#ef6c00", categoryName: "Utilities", completed: 53.45 },
];

export default function AccountReport() {
  const classes = useStyles();

  const sectionLabeler = dataEntry => {
    const percentage = Math.round(dataEntry.percentage) + "%";
    const value = dataEntry.value;
    const title = dataEntry.title;

    return `${percentage}\n$${value}\n${title}`;
  };

  return (
    <Container maxWidth="xl" className={classes.partial} >
      <CssBaseline />
      <h1>Accounts Overview</h1>
      <PieChart
        data={testData.map(item => ({
          title: item.categoryName,
          value: item.completed,
          color: item.bgcolor,
        }))}
        labelStyle={{ fontSize: '5px' }}
        label={({ dataEntry }) => sectionLabeler(dataEntry)}
        segmentsShift={0.5}
        animate
      />
    </Container>
  );
}