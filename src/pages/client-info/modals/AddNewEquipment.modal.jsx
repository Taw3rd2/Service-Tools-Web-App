import React, { useState } from "react";
import firebase from "firebase/app";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: theme.spacing(1),
    color: "teal",
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  requiredDisclaimer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "10px",
  },
}));

const AddNewEquipment = ({
  isAddNewEquipmentModalOpen,
  closeAddNewEquipmentModal,
  addNewEquipmentSuccessIndicator,
  client,
}) => {
  const classes = useStyles();

  const equipmentWarranty = "";
  const equipmentLabor = "";
  const equipmentContract = "";
  const equipmentNotes = "";

  const [equipmentBrand, setEquipmentBrand] = useState("");
  const [equipmentBtu, setEquipmentBtu] = useState("");
  const [equipmentEff, setEquipmentEff] = useState("");
  const [equipmentFuel, setEquipmentFuel] = useState("");
  const [equipmentModel, setEquipmentModel] = useState("");
  const [equipmentName, setEquipmentName] = useState("");
  const [equipmentSerial, setEquipmentSerial] = useState("");
  const [equipmentVoltage, setEquipmentVoltage] = useState("");

  const submitNewEquipment = (e) => {
    e.preventDefault();
    const newUnit = {
      customerId: client.id,
      equipmentWarranty,
      equipmentLabor,
      equipmentContract,
      equipmentNotes,
      equipmentBrand,
      equipmentBtu,
      equipmentEff,
      equipmentFuel,
      equipmentModel,
      equipmentName,
      equipmentSerial,
      equipmentVoltage,
    };

    firebase
      .firestore()
      .collection("customers")
      .doc(`${client.id}`)
      .collection("Equipment")
      .doc(`${equipmentName}`)
      .set(newUnit)
      .then(() => {
        addNewEquipmentSuccessIndicator();
        closeAddNewEquipmentModal();
      });
  };

  return (
    <Modal
      aria-labelledby="add-new-equipment-modal"
      aria-describedby="add-new-equipment-modal-form"
      open={isAddNewEquipmentModalOpen}
      onClose={closeAddNewEquipmentModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isAddNewEquipmentModalOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Add New Equipment
          </Typography>
          <form onSubmit={submitNewEquipment}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Equipment Name"
                  value={equipmentName}
                  onChange={(e) => setEquipmentName(e.target.value)}
                  inputProps={{ tabIndex: "1" }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Equipment Brand"
                  value={equipmentBrand}
                  onChange={(e) => setEquipmentBrand(e.target.value)}
                  inputProps={{ tabIndex: "2" }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Equipment Model"
                  value={equipmentModel}
                  onChange={(e) => setEquipmentModel(e.target.value)}
                  inputProps={{ tabIndex: "3" }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Equipment Serial"
                  value={equipmentSerial}
                  onChange={(e) => setEquipmentSerial(e.target.value)}
                  inputProps={{ tabIndex: "4" }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Equipment Size"
                  value={equipmentBtu}
                  onChange={(e) => setEquipmentBtu(e.target.value)}
                  inputProps={{ tabIndex: "5" }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Equipment Efficiency"
                  value={equipmentEff}
                  onChange={(e) => setEquipmentEff(e.target.value)}
                  inputProps={{ tabIndex: "6" }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Equipment Fuel or Freon Type"
                  value={equipmentFuel}
                  onChange={(e) => setEquipmentFuel(e.target.value)}
                  inputProps={{ tabIndex: "7" }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Equipment Voltage"
                  value={equipmentVoltage}
                  onChange={(e) => setEquipmentVoltage(e.target.value)}
                  inputProps={{ tabIndex: "8" }}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="flex-start"
              justify="flex-end"
              direction="row"
            >
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.button}
                startIcon={<ArrowUpwardIcon />}
              >
                Submit
              </Button>
              <Button
                type="button"
                color="primary"
                variant="contained"
                onClick={() => closeAddNewEquipmentModal()}
                className={classes.button}
                startIcon={<CloseIcon />}
              >
                Close
              </Button>
            </Grid>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default AddNewEquipment;
