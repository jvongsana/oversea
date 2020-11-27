import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useApplicationData } from "../../../hooks/useApplicationData";

const useStyles = makeStyles({
  partial: {
    backgroundColor: '#a6d0ef',
    height: 'auto',
    width: '80vw',
    borderRadius: '20px',
    padding: '24px 48px 48px 48px'
  },
  buttons: {
    display: "flex",
    "justify-content": "space-evenly"
  }
});

export default function AccountReport(props) {
  const classes = useStyles();
  const {
    renameAccount,
    deleteAccount
  } = useApplicationData();
  const { account } = props;

  return (
    <Container maxWidth="sm" className={classes.partial} >
      <CssBaseline />
      <h1>{account} Account Settings</h1>
      <div className={classes.buttons} >
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => renameAccount(account, "test")}
        >
          Edit
      </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={() => deleteAccount(account)}
        >
          Delete
      </Button>
      </div>
    </Container>
  );
}