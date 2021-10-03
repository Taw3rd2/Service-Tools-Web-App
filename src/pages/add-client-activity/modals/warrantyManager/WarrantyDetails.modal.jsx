import React, { useState } from "react";
import firebase from "firebase/app";

import { getFormattedDate } from "../../../../utils/dateUtils";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    minWidth: 275,
    width: "20%",
    maxHeight: 1050,
  },
  teal: {
    color: "teal",
  },
  text: {
    marginLeft: theme.spacing(1),
  },
  textField: {
    paddingTop: "3px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  buttonRed: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    backgroundColor: "red",
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  notes: {
    marginTop: theme.spacing(2),
  },
}));

const WarrantyDetails = ({
  isWarrantyDetailsModalOpen,
  closeWarrantyDetailsModal,
  warrantySelected,
  client,
  openDeleteWarrantyModal,
  warrantyUpdateSuccessIndicator,
}) => {
  const classes = useStyles();

  const [jobNumber, setJobNumber] = useState(
    warrantySelected.jobNumber ? warrantySelected.jobNumber : ""
  );
  const [laborExpirationDate, setLaborExpirationDate] = useState(
    warrantySelected.laborExpirationDate
      ? warrantySelected.laborExpirationDate.toDate()
      : new Date()
  );
  const [partsExpirationDate, setPartsExpirationDate] = useState(
    warrantySelected.partsExpirationDate
      ? warrantySelected.partsExpirationDate.toDate()
      : new Date()
  );
  const [startDate, setStartDate] = useState(
    warrantySelected.startDate
      ? warrantySelected.startDate.toDate()
      : new Date()
  );

  const onSubmitWarrantyUpdate = (e) => {
    e.preventDefault();
    const updatedWarranty = {
      key: warrantySelected.equipmentName,
      equipmentWarranty: getFormattedDate(partsExpirationDate),
      laborWarranty: getFormattedDate(laborExpirationDate),
      warranty: {
        key: warrantySelected.equipmentName,
        jobNumber,
        startDate,
        partsExpirationDate,
        laborExpirationDate,
        equipment: warrantySelected.equipmentName,
        equipmentName: warrantySelected.equipmentName,
        equipmentBrand: warrantySelected.equipmentBrand,
        equipmentModel: warrantySelected.equipmentModel,
        equipmentSerial: warrantySelected.equipmentSerial,
      },
    };
    firebase
      .firestore()
      .collection("customers")
      .doc(`${client.id}`)
      .collection("Equipment")
      .doc(`${warrantySelected.equipmentName}`)
      .update(updatedWarranty)
      .then(() => {
        closeWarrantyDetailsModal();
        warrantyUpdateSuccessIndicator();
      });
  };

  return (
    <Modal
      aria-labelledby="warranty-details-modal"
      aria-describedby="warranty-details-modal-form"
      open={isWarrantyDetailsModalOpen}
      onClose={closeWarrantyDetailsModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isWarrantyDetailsModalOpen}>
        <Card className={classes.root}>
          <CardHeader
            title={`${warrantySelected.equipmentName} Warranty Details`}
            className={classes.teal}
          />
          <CardContent className={classes.CardContent}>
            <form onSubmit={onSubmitWarrantyUpdate}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    value={jobNumber}
                    label="Job Number"
                    margin="normal"
                    fullWidth
                    onChange={(e) => setJobNumber(e.target.value)}
                    inputProps={{ tabIndex: "1" }}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="startDate"
                      label="Start Date"
                      value={startDate}
                      onChange={(date) => setStartDate(date)}
                      inputProps={{ tabIndex: "2" }}
                      fullWidth
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="partsExpirationDate"
                      label="Parts Expiration Date"
                      value={partsExpirationDate}
                      onChange={(date) => setPartsExpirationDate(date)}
                      inputProps={{ tabIndex: "3" }}
                      fullWidth
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="laborExpirationDate"
                      label="Labor Expiration Date"
                      value={laborExpirationDate}
                      onChange={(date) => setLaborExpirationDate(date)}
                      inputProps={{ tabIndex: "4" }}
                      fullWidth
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="flex-start"
                justify="flex-end"
                direction="row"
              >
                <Button
                  type="button"
                  size="large"
                  color="primary"
                  variant="contained"
                  className={classes.buttonRed}
                  startIcon={<DeleteIcon />}
                  onClick={() => openDeleteWarrantyModal()}
                >
                  Delete
                </Button>
                <Button
                  type="submit"
                  size="large"
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  startIcon={<ArrowUpwardIcon />}
                >
                  Update
                </Button>
                <Button
                  type="button"
                  size="large"
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  startIcon={<CloseIcon />}
                  onClick={() => closeWarrantyDetailsModal()}
                >
                  Close
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  );
};

export default WarrantyDetails;
