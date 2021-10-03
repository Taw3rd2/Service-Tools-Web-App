import React, { useState } from "react";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
  },
  formControl: {
    minWidth: 120,
  },
  margin: {
    marginTop: theme.spacing(3),
  },
  textFieldMargin: {
    marginTop: theme.spacing(1),
  },
  title: {
    color: "teal",
  },
  centerInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  buttonRed: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    backgroundColor: "red",
  },
  crossReferenceRed: {
    backgroundColor: "red",
  },
  pictureFrame: {
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
  },
  root: {
    padding: theme.spacing(3),
  },
  table: {
    minWidth: 500,
    border: "1px solid black",
  },
  spacing: {
    marginTop: theme.spacing(3),
  },
  responsiveImage: {
    width: "100%",
    objectFit: "contain",
    maxHeight: "240px",
    margin: theme.spacing(1),
  },
  select: {
    maxHeight: "400px",
  },
  rightMargin: {
    paddingRight: theme.spacing(1),
  },
}));

const BasicEditModal = ({
    editModalTitle,
    isEditModalOpen,
    closeEditModal,
    editModalForm,
}) => {
  const classes = useStyle();

  return (
    <Modal
      aria-labelledby={editModalTitle}
      aria-describedby={editModalTitle}
      open={isEditModalOpen}
      onClose={closeEditModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
        <Fade in={}>
            <div className={classes.paper}>
                <Typography variant="h5" gutterBottom className={classes.title}>
                    {editModalTitle}
                </Typography>
                {editModalForm}
            </div>
        </Fade>
    </Modal>
  );
};

export default BasicEditModal;
