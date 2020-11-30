import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export default function DeleteTransaction(props) {

  return (
    <IconButton
      aria-label="delete"
      color="secondary"
      onClick={() => props.deleteTransaction(props.transaction.id)}
    >
      <DeleteIcon color="secondary" />
    </IconButton>
  );
}