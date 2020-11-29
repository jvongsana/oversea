import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  table: {
    width: "89%",
  },
  actionButtons: {
    display: "flex",
    "justify-content": "space-evenly"
  }
});

const testData = [
  { bgcolor: "#6a1b9a", category: "Groceries", value: 60.00 },
  { bgcolor: "#00695c", category: "Rent", value: 30.50 },
  { bgcolor: "#ef6c00", category: "Utilities", value: 53.45 },
];

const getTotal = data => {
  let total = 0;
  data.forEach(item => {
    total += item.value;
  });

  return total;
};

export default function Dashboard() {
  const classes = useStyles();

  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><b>Color</b></TableCell>
            <TableCell align="center"><b>Category</b></TableCell>
            <TableCell align="center"><b>Expense</b></TableCell>
            <TableCell align="center"><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {testData.map(item => (
            <TableRow key={item.category}>
              <TableCell style={{ backgroundColor: item.bgcolor }} />
              <TableCell align="left">{item.category}</TableCell>
              <TableCell align="right">${item.value.toFixed(2)}</TableCell>
              <TableCell >
                <div className={classes.actionButtons} >
                  <IconButton
                    aria-label="edit"
                    color="primary"
                  // onClick={() => props.editTransaction(transaction.id, "Church's Chicken", 13.37, 1, INFLOW)}
                  >
                    <EditIcon
                      color="primary"
                    />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                  // onClick={() => props.deleteTransaction(transaction.id)}
                  >
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell />
            <TableCell align="left"><b>TOTAL</b></TableCell>
            <TableCell align="right">${getTotal(testData)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}