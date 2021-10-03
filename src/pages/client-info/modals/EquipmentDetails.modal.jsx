import React, { useState } from "react";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";

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
import EditIcon from "@material-ui/icons/Edit";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    minWidth: 275,
    width: "20%",
    maxHeight: 1050,
    padding: theme.spacing(1),
  },
  teal: {
    color: "teal",
  },
  text: {
    marginLeft: theme.spacing(1),
  },
  textField: {
    paddingTop: "3px",
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

const EquipmentDetails = ({
  isEquipmentDetailsModalOpen,
  closeEquipmentDetailsModal,
  equipmentSelected,
  client,
  openDeleteEquipmentModal,
  newUpdateEquipmentSuccessIndicator,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const [equipmentBrand, setEquipmentBrand] = useState(
    equipmentSelected.equipmentBrand
      ? equipmentSelected.equipmentBrand
      : "No brand recorded"
  );
  const [equipmentBtu, setEquipmentBtu] = useState(
    equipmentSelected.equipmentBtu ? equipmentSelected.equipmentBtu : ""
  );
  const [equipmentEff, setEquipmentEff] = useState(
    equipmentSelected.equipmentEff ? equipmentSelected.equipmentEff : ""
  );
  const [equipmentFuel, setEquipmentFuel] = useState(
    equipmentSelected.equipmentFuel ? equipmentSelected.equipmentFuel : ""
  );
  const [equipmentModel, setEquipmentModel] = useState(
    equipmentSelected.equipmentModel ? equipmentSelected.equipmentModel : ""
  );
  const [equipmentName, setEquipmentName] = useState(
    equipmentSelected.equipmentName ? equipmentSelected.equipmentName : ""
  );
  const [equipmentNotes, setEquipmentNotes] = useState(
    equipmentSelected.equipmentNotes
      ? equipmentSelected.equipmentNotes
      : "No notes yet.."
  );
  const [equipmentSerial, setEquipmentSerial] = useState(
    equipmentSelected.equipmentSerial ? equipmentSelected.equipmentSerial : ""
  );
  const [equipmentVoltage, setEquipmentVoltage] = useState(
    equipmentSelected.equipmentVoltage ? equipmentSelected.equipmentVoltage : ""
  );

  const onSubmitEquipmentUpdates = () => {
    const equipmentUpdates = {
      equipmentBrand,
      equipmentBtu,
      equipmentEff,
      equipmentFuel,
      equipmentModel,
      equipmentName,
      equipmentNotes,
      equipmentSerial,
      equipmentVoltage,
    };
    firebase
      .firestore()
      .collection("customers")
      .doc(`${equipmentSelected.customerId}`)
      .collection("Equipment")
      .doc(`${equipmentSelected.equipmentName}`)
      .update(equipmentUpdates)
      .then(() => {
        newUpdateEquipmentSuccessIndicator();
        closeEquipmentDetailsModal();
      });
  };

  const routeToPartsQuoteCreator = () => {
    const quoteData = {
      id: "",
      jobNumber: "",
      quoteDate: new Date(),
      parts: [],
      laborHours: 1,
      laborRate: 79,
      maintenance: false,
      rediagnostic: false,
      regularShippingTime: "5-7 days",
      quickShippingTime: "1-3 days",
      regularShippingRate: 25,
      quickShippingRate: 75,
      shippingNotes: "",
      selectedShipping: "none",
      selectedDiscount: "none",
      disclaimerRed: false,
    };
    history.push({
      pathname: "PartsQuote",
      state: {
        client: client,
        selectedEquipment: equipmentSelected,
        quoteData: quoteData,
      },
    });
  };

  return (
    <Modal
      aria-labelledby="delete-technician-modal"
      aria-describedby="delete-technician-modal-form"
      open={isEquipmentDetailsModalOpen}
      onClose={closeEquipmentDetailsModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isEquipmentDetailsModalOpen}>
        <Card className={classes.root}>
          <CardHeader
            title={`${equipmentSelected.equipmentName} Details`}
            className={classes.teal}
          />
          <CardContent className={classes.content}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={equipmentName}
                  label="Name"
                  fullWidth
                  onChange={(e) => setEquipmentName(e.target.value)}
                  inputProps={{ tabIndex: "1" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={equipmentBrand}
                  label="Brand"
                  fullWidth
                  onChange={(e) => setEquipmentBrand(e.target.value)}
                  inputProps={{ tabIndex: "2" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={equipmentModel}
                  label="Equipment Model Number"
                  fullWidth
                  onChange={(e) => setEquipmentModel(e.target.value)}
                  inputProps={{ tabIndex: "3" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={equipmentSerial}
                  label="Equipment Serial Number"
                  fullWidth
                  onChange={(e) => setEquipmentSerial(e.target.value)}
                  inputProps={{ tabIndex: "4" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={equipmentEff}
                  label="Equipment Efficiency"
                  fullWidth
                  onChange={(e) => setEquipmentEff(e.target.value)}
                  inputProps={{ tabIndex: "5" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={equipmentVoltage}
                  label="Equipment Voltage"
                  fullWidth
                  onChange={(e) => setEquipmentVoltage(e.target.value)}
                  inputProps={{ tabIndex: "6" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={equipmentFuel}
                  label="Equipment Fuel/Freon"
                  fullWidth
                  onChange={(e) => setEquipmentFuel(e.target.value)}
                  inputProps={{ tabIndex: "7" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={equipmentBtu}
                  label="Equipment Size"
                  fullWidth
                  onChange={(e) => setEquipmentBtu(e.target.value)}
                  inputProps={{ tabIndex: "8" }}
                />
              </Grid>
              <Grid item xs={12} className={classes.notes}>
                <TextField
                  value={equipmentNotes}
                  label="Equipment Notes"
                  variant="outlined"
                  fullWidth
                  multiline
                  onChange={(e) => setEquipmentNotes(e.target.value)}
                  inputProps={{ tabIndex: "9" }}
                />
              </Grid>
            </Grid>
          </CardContent>
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
              onClick={() => openDeleteEquipmentModal()}
            >
              Delete
            </Button>
            <Button
              type="button"
              size="large"
              color="primary"
              variant="contained"
              className={classes.button}
              startIcon={<ArrowUpwardIcon />}
              onClick={() => onSubmitEquipmentUpdates()}
            >
              Update
            </Button>
            <Button
              type="button"
              size="large"
              color="primary"
              variant="contained"
              className={classes.button}
              startIcon={<EditIcon />}
              onClick={() => routeToPartsQuoteCreator()}
            >
              Start Parts Quote
            </Button>
            <Button
              type="button"
              size="large"
              color="primary"
              variant="contained"
              className={classes.button}
              startIcon={<CloseIcon />}
              onClick={() => closeEquipmentDetailsModal()}
            >
              Close
            </Button>
          </Grid>
        </Card>
      </Fade>
    </Modal>
  );
};

export default EquipmentDetails;
