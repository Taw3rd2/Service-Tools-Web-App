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
    padding: theme.spacing(2),
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

const MaintenanceDetails = ({
  isMaintenanceDetailsModalOpen,
  closeMaintenanceDetailsModal,
  maintenanceSelected,
  client,
  openDeleteMaintenanceModal,
  maintenanceUpdateSuccessIndicator,
}) => {
  const classes = useStyles();

  const mNumber = maintenanceSelected.mNumber;

  const [salePrice, setSalePrice] = useState(
    maintenanceSelected.salePrice ? maintenanceSelected.salePrice : ""
  );
  const [saleDate, setSaleDate] = useState(
    maintenanceSelected.saleDate
      ? maintenanceSelected.saleDate.toDate()
      : new Date()
  );
  const [expirationDate, setExpirationDate] = useState(
    maintenanceSelected.expirationDate
      ? maintenanceSelected.expirationDate.toDate()
      : new Date()
  );
  const [completedDate, setCompletedDate] = useState(
    maintenanceSelected.completedDate === null
      ? null
      : maintenanceSelected.completedDate.toDate()
  );

  const onSubmitMaintenanceUpdate = (e) => {
    e.preventDefault();
    const updatedMaintenance = {
      mNumber,
      saleDate,
      salePrice,
      expirationDate,
      completedDate,
      equipment: maintenanceSelected.equipmentName,
    };

    firebase
      .firestore()
      .collection("customers")
      .doc(`${client.id}`)
      .collection("Maintenance")
      .doc(`${maintenanceSelected.mNumber}`)
      .update(updatedMaintenance)
      .then(() => {
        console.log("first part of maintenance updated");
      })
      .catch((error) => {
        console.error("firestore error ", error);
      });

    firebase
      .firestore()
      .collection("customers")
      .doc(`${client.id}`)
      .collection("Equipment")
      .doc(`${maintenanceSelected.equipmentName}`)
      .update({ equipmentContract: getFormattedDate(expirationDate) })
      .then(() => {
        closeMaintenanceDetailsModal();
        maintenanceUpdateSuccessIndicator();
      })
      .catch((error) => {
        console.error("firebase error", error);
      });
  };

  return (
    <Modal
      aria-labelledby="maintenance-details-modal"
      aria-describedby="maintenance-details-modal-form"
      open={isMaintenanceDetailsModalOpen}
      onClose={closeMaintenanceDetailsModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isMaintenanceDetailsModalOpen}>
        <Card className={classes.root}>
          <CardHeader
            title={`${maintenanceSelected.equipmentName} Maintenance Details`}
            className={classes.teal}
          />
          <CardContent className={classes.CardContent}>
            <form onSubmit={onSubmitMaintenanceUpdate}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    value={mNumber}
                    label="M-Number"
                    margin="normal"
                    fullWidth
                    inputProps={{ tabIndex: "1" }}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="saleDate"
                      label="Sale Date"
                      value={saleDate}
                      onChange={(date) => setSaleDate(date)}
                      inputProps={{ tabIndex: "2" }}
                      fullWidth
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    value={salePrice}
                    label="Sale Price"
                    margin="normal"
                    fullWidth
                    onChange={(e) => setSalePrice(e.target.value)}
                    inputProps={{ tabIndex: "3" }}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="expirationDate"
                      label="Expiration Date"
                      value={expirationDate}
                      onChange={(date) => setExpirationDate(date)}
                      inputProps={{ tabIndex: "4" }}
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
                      id="completedDate"
                      label="Completion Date"
                      value={completedDate}
                      onChange={(date) => setCompletedDate(date)}
                      inputProps={{ tabIndex: "5" }}
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
                  onClick={() => openDeleteMaintenanceModal()}
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
                  onClick={() => closeMaintenanceDetailsModal()}
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

export default MaintenanceDetails;
