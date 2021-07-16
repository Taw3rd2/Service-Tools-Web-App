import React, { useState } from "react";
import firebase from "firebase/app";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CloseIcon from "@material-ui/icons/Close";
import Checkbox from "@material-ui/core/Checkbox";
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
  buttonRed: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    backgroundColor: "red",
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
}));

const EditClient = ({
  isEditClientModalOpen,
  closeEditClientModal,
  currentClient,
  editClientSaveSuccessIndicator,
  openDeleteClientModal,
}) => {
  const classes = useStyles();

  //field values
  const [lastNameError, setLastNameError] = useState(false);
  const [billingiscommercial, setBillingIsCommercial] = useState(
    currentClient.billingiscommercial
      ? currentClient.billingiscommercial
      : false
  );
  const [noService, setNoService] = useState(
    currentClient.noService ? currentClient.noService : false
  );
  const [firstname, setFirstName] = useState(
    currentClient.firstname ? currentClient.firstname : ""
  );
  const [lastname, setLastName] = useState(
    currentClient.lastname ? currentClient.lastname : ""
  );
  const [street, setStreet] = useState(
    currentClient.street ? currentClient.street : ""
  );
  const [city, setCity] = useState(
    currentClient.city ? currentClient.city : ""
  );
  const [state, setState] = useState(
    currentClient.state ? currentClient.state : ""
  );
  const [zip, setZip] = useState(currentClient.zip ? currentClient.zip : "");
  const [phoneName, setPhoneName] = useState(
    currentClient.phoneName ? currentClient.phoneName : ""
  );
  const [altPhoneName, setAltPhoneName] = useState(
    currentClient.altPhoneName ? currentClient.altPhoneName : ""
  );
  const [otherPhoneName, setOtherPhoneName] = useState(
    currentClient.otherPhoneName ? currentClient.otherPhoneName : ""
  );
  const [phone, setPhone] = useState(
    currentClient.phone ? currentClient.phone : ""
  );
  const [altphone, setAltPhone] = useState(
    currentClient.altphone ? currentClient.altphone : ""
  );
  const [otherPhone, setOtherPhone] = useState(
    currentClient.otherPhone ? currentClient.otherPhone : ""
  );
  const [email, setEmail] = useState(
    currentClient.email ? currentClient.email : ""
  );

  const updateClient = (event) => {
    event.preventDefault();
    const clientToUpdate = {
      billingiscommercial,
      noService,
      firstname,
      lastname,
      street,
      city,
      state,
      zip,
      phoneName,
      altPhoneName,
      otherPhoneName,
      phone,
      altphone,
      otherPhone,
      email,
    };
    if (lastname === "") {
      setLastNameError(true);
      return;
    } else {
      firebase
        .firestore()
        .collection("customers")
        .doc(currentClient.id)
        .update(clientToUpdate)
        .then(() => {
          editClientSaveSuccessIndicator();
          closeEditClientModal();
        });
    }
  };

  return (
    <Modal
      aria-labelledby="edit-customer-modal"
      aria-describedby="edit-customer-modal-form"
      open={isEditClientModalOpen}
      onClose={closeEditClientModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isEditClientModalOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Edit Client Information
          </Typography>
          <form onSubmit={updateClient} autoComplete="new password">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <h3>
                  Commercial:
                  <Checkbox
                    name="billingiscommercial"
                    color="primary"
                    checked={billingiscommercial}
                    onChange={(e) => setBillingIsCommercial(e.target.checked)}
                  />
                </h3>
              </Grid>
              <Grid item xs={6}>
                <h3>
                  No Service:
                  <Checkbox
                    name="noService"
                    color="primary"
                    checked={noService}
                    onChange={(e) => setNoService(e.target.checked)}
                  />
                </h3>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={firstname}
                  label="First Name"
                  fullWidth
                  onChange={(e) => setFirstName(e.target.value)}
                  inputProps={{ tabIndex: "1" }}
                />
              </Grid>
              {lastNameError ? (
                <Grid item xs={6}>
                  <TextField
                    error
                    value={lastname}
                    label="Last Name"
                    fullWidth
                    onChange={(e) => setLastName(e.target.value)}
                    inputProps={{ tabIndex: "2" }}
                  />
                </Grid>
              ) : (
                <Grid item xs={6}>
                  <TextField
                    value={lastname}
                    label="Last Name"
                    fullWidth
                    onChange={(e) => setLastName(e.target.value)}
                    inputProps={{ tabIndex: "2" }}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  value={street}
                  label="Street Address"
                  fullWidth
                  onChange={(e) => setStreet(e.target.value)}
                  inputProps={{ tabIndex: "3" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={city}
                  label="City"
                  fullWidth
                  onChange={(e) => setCity(e.target.value)}
                  inputProps={{ tabIndex: "4" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={state}
                  label="State"
                  fullWidth
                  onChange={(e) => setState(e.target.value)}
                  inputProps={{ tabIndex: "5" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={zip}
                  label="Zip"
                  fullWidth
                  onChange={(e) => setZip(e.target.value)}
                  inputProps={{ tabIndex: "6" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={phoneName}
                  label="Primary Contact Name"
                  fullWidth
                  onChange={(e) => setPhoneName(e.target.value)}
                  inputProps={{ tabIndex: "7" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={altPhoneName}
                  label="Secondary Contact Name"
                  fullWidth
                  onChange={(e) => setAltPhoneName(e.target.value)}
                  inputProps={{ tabIndex: "9" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={otherPhoneName}
                  label="Other Contact Name"
                  fullWidth
                  onChange={(e) => setOtherPhoneName(e.target.value)}
                  inputProps={{ tabIndex: "11" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={phone}
                  label="Primary Phone Number"
                  fullWidth
                  onChange={(e) => setPhone(e.target.value)}
                  inputProps={{ tabIndex: "8" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={altphone}
                  label="Secondary Phone Number"
                  fullWidth
                  onChange={(e) => setAltPhone(e.target.value)}
                  inputProps={{ tabIndex: "10" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={otherPhone}
                  label="Other Phone Number"
                  fullWidth
                  onChange={(e) => setOtherPhone(e.target.value)}
                  inputProps={{ tabIndex: "12" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  label="Email Address"
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                  inputProps={{ tabIndex: "13" }}
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
                className={classes.buttonRed}
                onClick={() => openDeleteClientModal()}
                variant="contained"
                color="primary"
                tabIndex="14"
                startIcon={<DeleteIcon />}
              >
                Delete Customer
              </Button>
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
                onClick={() => closeEditClientModal()}
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

export default EditClient;
