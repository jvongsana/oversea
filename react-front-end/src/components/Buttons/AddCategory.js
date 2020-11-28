import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles({
  button: {
    marginTop: '3.5em',
    marginLeft: '5em',
    backgroundColor: '#01234c',
    "&:hover": {
      backgroundColor: '#a6d0ef'
    },
    fontSize: '12px'
  },
  formControl: {
    width: 500,
    padding: '0 1em'
  }
});

export default function addCategory(props) { 
  const classes = useStyles();
  const [input, setInput] = useState(0);
  const [openCategory, setOpenCategory] = useState(false);
  const handleOpenCategory = () => {
    setOpenCategory(true);
  };

  const handleCloseCategory = () => {
    setOpenCategory(false);
  };

  const handleChangeInput = (event) => {
    setInput(event.target.value);
  };

  const addNewCategory = () => {
    props.addCategory(input);
    setInput("");
    handleCloseCategory();
  };
  

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleOpenCategory} className={classes.button}>
        Add Categories
          </Button>
      <Dialog open={openCategory} onClose={handleCloseCategory} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
        <DialogContent>
          <h3>Enter Category</h3>
          <FormControl component="fieldset" className={classes.formControl}>
            <TextField
              id="outlined-secondary"
              label=""
              variant="outlined"
              color="primary"
              onChange={handleChangeInput}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCategory} color="primary" className={classes.button}>
            Cancel
              </Button>
          <Button onClick={addNewCategory} color="primary" className={classes.button}>
            Add
              </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
