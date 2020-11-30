import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from "@material-ui/icons/Delete";

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
  },
  actionButtons: {
    display: "flex",
    "justify-content": "space-evenly"
  },
  modalButtons: {
    padding: '10px',
    width: '220px',
    backgroundColor: '#01234c',
    borderRadius: '20px',
    textAlign: 'center',
    margin: '10px 0 10px 10px',
    "&:hover": {
      backgroundColor: '#a6d0ef',
      padding: '10px',
      borderRadius: '20px'
    }
  }
});

export default function editDeleteCategory(props) {
  const classes = useStyles();
  const { id, name, renameCategory, deleteCategory } = props;
  const [input, setInput] = useState(name || "");
  const [open, setOpen] = useState(false);

  // open pop-up modal
  const handleOpen = () => {
    setOpen(true);
  };

  // close pop-up modal
  const handleClose = () => {
    setOpen(false);
  };

  // update textfield with keyboard inputs
  const handleChangeInput = (event) => {
    setInput(event.target.value);
  };

  // edit account in db
  const editCategory = () => {
    renameCategory(id, input);
    setInput("");
    handleClose();
  };

  return (
    <div className={classes.actionButtons} >
      <IconButton
        aria-label="edit"
        color="primary"
        onClick={handleOpen}
      >
        <EditIcon
          color="primary"
        />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">
          Edit Category
          </DialogTitle>
        <DialogContent >
          <h3>Enter New Category Name</h3>
          <FormControl component="fieldset" className={classes.formControl}>
            <TextField
              id="outlined-secondary"
              variant="outlined"
              color="primary"
              defaultValue={input}
              onChange={handleChangeInput}
            />
          </FormControl>
        </DialogContent>
        <DialogActions className={classes.root}>
          <Button onClick={editCategory} color="primary" className={classes.modalButtons}>
            Edit
          </Button>
          <Button onClick={handleClose} color="primary" className={classes.modalButtons}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <IconButton
        aria-label="delete"
        color="secondary"
        onClick={() => deleteCategory(id)}
      >
        <DeleteIcon color="secondary" />
      </IconButton>
    </div>
  );
}
