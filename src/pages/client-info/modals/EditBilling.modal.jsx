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
  title: {
    marginBottom: theme.spacing(1),
    color: "teal",
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
}));

const EditBilling = ({
  isEditBillingModalOpen,
  closeEditBillingModal,
  currentClient,
  editClientBillingSaveSuccessIndicator,
}) => {
  const classes = useStyles();

  //field values
  const [billingorg, setBillingOrg] = useState(
    currentClient.billingorg ? currentClient.billingorg : null
  );
  const [billingPrimaryName, setBillingPrimaryName] = useState(
    currentClient.billingPrimaryName ? currentClient.billingPrimaryName : null
  );
  const [billingAlternateName, setBillingAlternateName] = useState(
    currentClient.billingAlternateName
      ? currentClient.billingAlternateName
      : null
  );
  const [billingOtherName, setBillingOtherName] = useState(
    currentClient.billingOtherName ? currentClient.billingOtherName : null
  );
  const [billingPrimaryPhone, setBillingPrimaryPhone] = useState(
    currentClient.billingPrimaryPhone ? currentClient.billingPrimaryPhone : null
  );
  const [billingAlternatePhone, setBillingAlternatePhone] = useState(
    currentClient.billingAlternatePhone
      ? currentClient.billingAlternatePhone
      : null
  );
  const [billingOtherPhone, setBillingOtherPhone] = useState(
    currentClient.billingOtherPhone ? currentClient.billingOtherPhone : null
  );
  const [billingPrimaryEmail, setBillingPrimaryEmail] = useState(
    currentClient.billingPrimaryEmail ? currentClient.billingPrimaryEmail : null
  );
  const [billingAlternateEmail, setBillingAlternateEmail] = useState(
    currentClient.billingAlternateEmail
      ? currentClient.billingAlternateEmail
      : null
  );
  const [billingOtherEmail, setBillingOtherEmail] = useState(
    currentClient.billingOtherEmail ? currentClient.billingOtherEmail : null
  );
  const [billingstreet, setBillingStreet] = useState(
    currentClient.billingstreet ? currentClient.billingstreet : null
  );
  const [billingcity, setBillingCity] = useState(
    currentClient.billingcity ? currentClient.billingcity : null
  );
  const [billingstate, setBillingState] = useState(
    currentClient.billingstate ? currentClient.billingstate : null
  );
  const [billingzip, setBillingZip] = useState(
    currentClient.billingzip ? currentClient.billingzip : null
  );

  const updateClientBilling = (event) => {
    event.preventDefault();
    const clientBillingToUpdate = {
      billingorg,
      billingPrimaryName,
      billingAlternateName,
      billingOtherName,
      billingPrimaryPhone,
      billingAlternatePhone,
      billingOtherPhone,
      billingPrimaryEmail,
      billingAlternateEmail,
      billingOtherEmail,
      billingstreet,
      billingcity,
      billingstate,
      billingzip,
    };
    firebase
      .firestore()
      .collection("customers")
      .doc(currentClient.id)
      .update(clientBillingToUpdate)
      .then(() => {
        editClientBillingSaveSuccessIndicator();
        closeEditBillingModal();
      });
  };

  return (
    <Modal
      aria-labelledby="edit-billing-modal"
      aria-describedby="edit-billing-modal-form"
      open={isEditBillingModalOpen}
      onClose={closeEditBillingModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isEditBillingModalOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Edit Billing Information
          </Typography>
          <form onSubmit={updateClientBilling} autoComplete="new password">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  value={billingorg}
                  label="Organization Name"
                  fullWidth
                  onChange={(e) => setBillingOrg(e.target.value)}
                  inputProps={{ tabIndex: "1" }}
                  required
                />
              </Grid>
              <Grid item xs={6} />
              <Grid item xs={4}>
                <TextField
                  value={billingPrimaryName}
                  label="Primary Contact Name"
                  fullWidth
                  onChange={(e) => setBillingPrimaryName(e.target.value)}
                  inputProps={{ tabIndex: "2" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={billingAlternateName}
                  label="Alternate Contact Name"
                  fullWidth
                  onChange={(e) => setBillingAlternateName(e.target.value)}
                  inputProps={{ tabIndex: "5" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={billingOtherName}
                  label="Other Contact Name"
                  fullWidth
                  onChange={(e) => setBillingOtherName(e.target.value)}
                  inputProps={{ tabIndex: "8" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={billingPrimaryPhone}
                  label="Primary Phone Number"
                  fullWidth
                  onChange={(e) => setBillingPrimaryPhone(e.target.value)}
                  inputProps={{ tabIndex: "3" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={billingAlternatePhone}
                  label="Alternate Phone Number"
                  fullWidth
                  onChange={(e) => setBillingAlternatePhone(e.target.value)}
                  inputProps={{ tabIndex: "6" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={billingOtherPhone}
                  label="Other Phone Number"
                  fullWidth
                  onChange={(e) => setBillingOtherPhone(e.target.value)}
                  inputProps={{ tabIndex: "9" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={billingPrimaryEmail}
                  label="Primary Email"
                  fullWidth
                  onChange={(e) => setBillingPrimaryEmail(e.target.value)}
                  inputProps={{ tabIndex: "4" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={billingAlternateEmail}
                  label="Alternate Email"
                  fullWidth
                  onChange={(e) => setBillingAlternateEmail(e.target.value)}
                  inputProps={{ tabIndex: "7" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={billingOtherEmail}
                  label="Other Email"
                  fullWidth
                  onChange={(e) => setBillingOtherEmail(e.target.value)}
                  inputProps={{ tabIndex: "10" }}
                />
              </Grid>
              <hr />
              <Grid item xs={12}>
                <TextField
                  value={billingstreet}
                  label="Billing Street Address"
                  fullWidth
                  onChange={(e) => setBillingStreet(e.target.value)}
                  inputProps={{ tabIndex: "11" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={billingcity}
                  label="City"
                  fullWidth
                  onChange={(e) => setBillingCity(e.target.value)}
                  inputProps={{ tabIndex: "12" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={billingstate}
                  label="State"
                  fullWidth
                  onChange={(e) => setBillingState(e.target.value)}
                  inputProps={{ tabIndex: "13" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={billingzip}
                  label="Zip Code"
                  fullWidth
                  onChange={(e) => setBillingZip(e.target.value)}
                  inputProps={{ tabIndex: "14" }}
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
                className={classes.button}
                variant="contained"
                color="primary"
                tabIndex="15"
                type="submit"
                startIcon={<ArrowUpwardIcon />}
              >
                Submit Changes
              </Button>
              <Button
                className={classes.button}
                onClick={() => closeEditBillingModal()}
                variant="contained"
                color="primary"
                tabIndex="16"
                startIcon={<CloseIcon />}
              >
                Cancel
              </Button>
            </Grid>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default EditBilling;
