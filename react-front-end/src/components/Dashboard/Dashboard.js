import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core/';
import { PieChart } from 'react-minimal-pie-chart';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  partial: {
    backgroundColor: '#a6d0ef',
    height: '100vh',
    width: '80vw',
    borderRadius: '20px',
    padding: '24px 48px 48px 48px'
  }
});

const testData = [
  { bgcolor: "#6a1b9a", category: "Groceries", value: 60.00 },
  { bgcolor: "#00695c", category: "Rent", value: 30.50 },
  { bgcolor: "#ef6c00", category: "Utilities", value: 53.45 },
];

export default function AccountReport() {
  const classes = useStyles();

  const getTotal = data => {
    let total = 0;
    data.forEach(item => {
      total += item.value;
    });

    return total;
  };

  return (
    <Container maxWidth="xl" className={classes.partial} >
      <CssBaseline />
      <h1>Accounts Overview</h1>
      <h3>Total Expenses: ${getTotal(testData)}</h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Expense</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testData.map(item => (
              <TableRow key={item.category}>
                <TableCell component="th" scope="row">
                  {item.category}
                </TableCell>
                <TableCell align="right">${item.value.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PieChart
        data={testData.map(item => ({
          title: item.category,
          value: item.value,
          color: item.bgcolor,
        }))}
        labelStyle={{ fontSize: '5px' }}
        label={({ dataEntry }) => (Math.round(dataEntry.percentage) + "%")}
        segmentsShift={0.5}
        animate
      />
    </Container>
  );
}