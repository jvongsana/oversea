import React from 'react';
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
  const classes = useStyles();
  return (
      <div className={classes.container}>
        <Drawer />
        <Container />
      </div>
     
    );
}