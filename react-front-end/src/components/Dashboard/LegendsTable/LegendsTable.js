import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { getAmountDollars } from '../../../helpers/selectors'

const useStyles = makeStyles({
  table: {
    width: "89%",
    height: ''
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },
  div: {
    width: '89%'
  }
});

const getTotal = data => {
  let total = 0;
  data.forEach(item => {
    total += item.total;
  });

  return getAmountDollars(total);
};

export default function LegendsTable(props) {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, props.categories.length - page * rowsPerPage);

  return (
    <div className={classes.div}>
      <TableContainer className={classes.table} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"><b>Color</b></TableCell>
              <TableCell align="center"><b>Category</b></TableCell>
              <TableCell align="center"><b>Expense</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.accountData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(item => (
              <TableRow key={item.category}>
                <TableCell style={{ backgroundColor: item.bgcolor }} />
                <TableCell align="left">{item.category}</TableCell>
                <TableCell align="right">${getAmountDollars(item.total)}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            <TableRow>
              <TableCell />
              <TableCell align="left"><b>TOTAL</b></TableCell>
              <TableCell align="right">${getTotal(props.accountData)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[3, 6]}
          component="div"
          count={props.categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}