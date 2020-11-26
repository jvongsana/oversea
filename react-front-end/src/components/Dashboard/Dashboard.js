import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core/';
import { PieChart } from 'react-minimal-pie-chart';
import { makeStyles } from '@material-ui/core/styles';
import LegendsTable from './LegendsTable/LegendsTable';

const useStyles = makeStyles({
  partial: {
    backgroundColor: '#a6d0ef',
    height: 'auto',
    width: '80vw',
    borderRadius: '20px',
    padding: '24px 48px 48px 48px'
  },
  tableAndGraphContainer: {
    display: "flex"
  }
});

const testData = [
  { bgcolor: "#6a1b9a", category: "Groceries", value: 60.00 },
  { bgcolor: "#00695c", category: "Rent", value: 30.50 },
  { bgcolor: "#ef6c00", category: "Utilities", value: 53.45 },
];

export default function Dashboard() {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.partial} >
      <CssBaseline />
      <h1>Accounts Overview</h1>
      <div className={classes.tableAndGraphContainer}>
        <LegendsTable />
        <PieChart
          data={testData.map(item => ({
            title: item.category,
            value: item.value,
            color: item.bgcolor,
          }))}
          radius={40}
          segmentsShift={0.5}
          labelStyle={{ fontSize: '5px' }}
          label={({ dataEntry }) => (Math.round(dataEntry.percentage) + "%")}
          animate
        />
      </div>
    </Container>
  );
}