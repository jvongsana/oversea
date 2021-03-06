import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core/';
import { PieChart } from 'react-minimal-pie-chart';
import { makeStyles } from '@material-ui/core/styles';
import LegendsTable from './LegendsTable/LegendsTable';
import { getPercentCategoryExpense, getTotalCategorySpending } from '../../helpers/selectors';

const useStyles = makeStyles({
  partial: {
    backgroundColor: '#a6d0ef',
    height: '100%',
    padding: '48px 48px 48px'
  },
  tableAndGraphContainer: {
    display: "flex"
  },
  pie: {
    marginTop: '-10em'
  }
});

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



export default function Dashboard(props) {
  const classes = useStyles();
  const { transactions, categories, addCategory, renameCategory, deleteCategory } = props;

  const pieChartData = categories.map(category => ({
    id: category.id,
    bgcolor: getRandomColor(),
    category: category.name,
    value: Number(getPercentCategoryExpense(transactions, category)),
    total: getTotalCategorySpending(transactions, category)
  }));

  return (
    <Container maxWidth="xl" className={classes.partial} >
      <CssBaseline />
      <h1>Accounts Overview</h1>
      <div className={classes.tableAndGraphContainer}>
        <LegendsTable
          pieChartData={pieChartData}
          categories={categories}
          addCategory={addCategory}
          renameCategory={renameCategory}
          deleteCategory={deleteCategory}
        />
        <PieChart
          className={classes.pie}
          data={pieChartData.map(item => ({
            title: item.category,
            value: item.value,
            color: item.bgcolor,
          }))}
          radius={25}
          segmentsShift={0.5}
          labelStyle={{ fontSize: '5px' }}
          label={({ dataEntry }) => (Math.round(dataEntry.percentage) + "%")}
          animate
        />
      </div>
    </Container>
  );
}