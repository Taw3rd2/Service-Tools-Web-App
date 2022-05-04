import React, { useState } from "react";
import { connect } from "react-redux";
import { addClientStart } from "../../../redux/clients/clients.actions";

import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CloseIcon from "@material-ui/icons/Close";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 800,
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

const AddNewClient = ({
  isClientModalOpen,
  closeAddClientModal,
  newClientSaveSuccessIndicator,
  addClientStart,
}) => {
  const classes = useStyles();
  //const [client, setClient] = useState({});

  const cnotes = "";
  const squarefootage = "";
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("MI");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [phoneName, setPhoneName] = useState("");
  const [altPhoneName, setAltPhoneName] = useState("");
  const [otherPhoneName, setOtherPhoneName] = useState("");
  const [phone, setPhone] = useState("");
  const [altphone, setAltPhone] = useState("");
  const [otherPhone, setOtherPhone] = useState("");
  const [billingorg, setBillingOrg] = useState(null);
  const [billingPrimaryName, setBillingPrimaryName] = useState(null);
  const [billingAlternateName, setBillingAlternateName] = useState(null);
  const [billingOtherName, setBillingOtherName] = useState(null);
  const [billingPrimaryPhone, setBillingPrimaryPhone] = useState(null);
  const [billingAlternatePhone, setBillingAlternatePhone] = useState(null);
  const [billingOtherPhone, setBillingOtherPhone] = useState(null);
  const [billingPrimaryEmail, setBillingPrimaryEmail] = useState(null);
  const [billingAlternateEmail, setBillingAlternateEmail] = useState(null);
  const [billingOtherEmail, setBillingOtherEmail] = useState(null);
  const [billingstreet, setBillingStreet] = useState(null);
  const [billingcity, setBillingCity] = useState(null);
  const [billingstate, setBillingState] = useState(null);
  const [billingzip, setBillingZip] = useState(null);
  const [billingiscommercial, setToCommercial] = useState(false);
  const [addBillingInfo, setAddBillingInfoOpen] = useState(false);

  const submitClient = (event) => {
    event.preventDefault();
    const client = {
      firstname,
      lastname,
      street,
      city,
      state,
      zip,
      email,
      phoneName,
      altPhoneName,
      otherPhoneName,
      phone,
      altphone,
      otherPhone,
      cnotes,
      squarefootage,
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
      billingiscommercial,
    };
    console.log(client);
    addClientStart(client);
    newClientSaveSuccessIndicator();
    closeAddClientModal();
  };

  return (
    <Modal
      aria-labelledby="add-new-customer-modal"
      aria-describedby="add-new-customer-modal-form"
      open={isClientModalOpen}
      onClose={closeAddClientModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isClientModalOpen}>
        <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5" gutterBottom className={classes.title}>
                Add New Customer
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <h3 className={classes.checkbox}>
                Commercial Customer:
                <Checkbox
                  name="billingiscommercial"
                  color="primary"
                  checked={billingiscommercial}
                  onChange={(event) => setToCommercial(event.target.checked)}
                />
              </h3>
            </Grid>
          </Grid>

          <form onSubmit={submitClient} autoComplete="new password">
            <Grid container spacing={2}>
              {billingiscommercial ? (
                <>
                  <Grid item xs={12}>
                    <TextField
                      label="Job Site Business Name or Tennant's Name"
                      name="lastname"
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                      inputProps={{ tabIndex: "1" }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Job Site Street Address"
                      name="street"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      inputProps={{ tabIndex: "2" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Job Site City"
                      name="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      inputProps={{ tabIndex: "3" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Job Site State"
                      name="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      inputProps={{ tabIndex: "4" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Job Site Zip Code"
                      name="zip"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      inputProps={{ tabIndex: "5" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Job Site Contact Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      inputProps={{ tabIndex: "6" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Job Site Primary Contact"
                      name="phoneName"
                      value={phoneName}
                      onChange={(e) => setPhoneName(e.target.value)}
                      inputProps={{ tabIndex: "7" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Job Site Alternate Contact"
                      name="altPhoneName"
                      value={altPhoneName}
                      onChange={(e) => setAltPhoneName(e.target.value)}
                      inputProps={{ tabIndex: "9" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Job Site Other Contact"
                      name="otherPhoneName"
                      value={otherPhoneName}
                      onChange={(e) => setOtherPhoneName(e.target.value)}
                      inputProps={{ tabIndex: "11" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Job Site Primary Phone"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      inputProps={{ tabIndex: "8" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Job Site Alternate Phone"
                      name="altphone"
                      value={altphone}
                      onChange={(e) => setAltPhone(e.target.value)}
                      inputProps={{ tabIndex: "10" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Job Site Other Phone"
                      name="otherPhone"
                      value={otherPhone}
                      onChange={(e) => setOtherPhone(e.target.value)}
                      inputProps={{ tabIndex: "12" }}
                      fullWidth
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={6}>
                    <TextField
                      label="First Name"
                      name="firstname"
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                      inputProps={{ tabIndex: "1" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Last Name"
                      name="lastname"
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                      inputProps={{ tabIndex: "2" }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Street Address"
                      name="street"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      inputProps={{ tabIndex: "3" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="City"
                      name="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      inputProps={{ tabIndex: "4" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="State"
                      name="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      inputProps={{ tabIndex: "5" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Zip Code"
                      name="zip"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      inputProps={{ tabIndex: "6" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      inputProps={{ tabIndex: "7" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Primary Phone Name"
                      name="phoneName"
                      value={phoneName}
                      onChange={(e) => setPhoneName(e.target.value)}
                      inputProps={{ tabIndex: "8" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Alternate Phone Name"
                      name="altPhoneName"
                      value={altPhoneName}
                      onChange={(e) => setAltPhoneName(e.target.value)}
                      inputProps={{ tabIndex: "10" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Other Phone Name"
                      name="otherPhoneName"
                      value={otherPhoneName}
                      onChange={(e) => setOtherPhoneName(e.target.value)}
                      inputProps={{ tabIndex: "12" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Primary Phone Number"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      inputProps={{ tabIndex: "9" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Alternate Phone Number"
                      name="altphone"
                      value={altphone}
                      onChange={(e) => setAltPhone(e.target.value)}
                      inputProps={{ tabIndex: "11" }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Other Phone Number"
                      name="otherPhone"
                      value={otherPhone}
                      onChange={(e) => setOtherPhone(e.target.value)}
                      inputProps={{ tabIndex: "13" }}
                      fullWidth
                    />
                  </Grid>
                </>
              )}
            </Grid>
            {addBillingInfo && (
              <>
                <hr />
                <h2>Billing Information</h2>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      value={billingorg}
                      onChange={(e) => setBillingOrg(e.target.value)}
                      label="Business Name or Landlord's Name"
                      fullWidth
                      inputProps={{ tabIndex: "14" }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={billingPrimaryName}
                      onChange={(e) => setBillingPrimaryName(e.target.value)}
                      label="Primary Contact"
                      fullWidth
                      inputProps={{ tabIndex: "15" }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={billingAlternateName}
                      label="Alternate Contact"
                      onChange={(e) => setBillingAlternateName(e.target.value)}
                      fullWidth
                      inputProps={{ tabIndex: "18" }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={billingOtherName}
                      label="Other Contact"
                      onChange={(e) => setBillingOtherName(e.target.value)}
                      fullWidth
                      inputProps={{ tabIndex: "21" }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={billingPrimaryPhone}
                      label="Primary Phone Number"
                      onChange={(e) => setBillingPrimaryPhone(e.target.value)}
                      fullWidth
                      inputProps={{ tabIndex: "16" }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={billingAlternatePhone}
                      label="Alternate Phone Number"
                      onChange={(e) => setBillingAlternatePhone(e.target.value)}
                      fullWidth
                      inputProps={{ tabIndex: "19" }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={billingOtherPhone}
                      label="Other Phone Number"
                      onChange={(e) => setBillingOtherPhone(e.target.value)}
                      fullWidth
                      inputProps={{ tabIndex: "22" }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={billingPrimaryEmail}
                      label="Primary Email"
                      onChange={(e) => setBillingPrimaryEmail(e.target.value)}
                      fullWidth
                      inputProps={{ tabIndex: "17" }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={billingAlternateEmail}
                      label="Alternate Email"
                      onChange={(e) => setBillingAlternateEmail(e.target.value)}
                      fullWidth
                      inputProps={{ tabIndex: "20" }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={billingOtherEmail}
                      label="Other Email"
                      onChange={(e) => setBillingOtherEmail(e.target.value)}
                      fullWidth
                      inputProps={{ tabIndex: "23" }}
                    />
                  </Grid>
                  <hr />
                  <Grid item xs={12}>
                    <TextField
                      value={billingstreet}
                      label="Billing Street Address"
                      onChange={(e) => setBillingStreet(e.target.value)}
                      fullWidth
                      inputProps={{ tabIndex: "24" }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={billingcity}
                      label="Billing City"
                      onChange={(e) => setBillingCity(e.target.value)}
                      fullWidth
                      inputProps={{ tabIndex: "25" }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={billingstate}
                      label="Billing State"
                      onChange={(e) => setBillingState(e.target.value)}
                      fullWidth
                      inputProps={{ tabIndex: "26" }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      value={billingzip}
                      label="Billing Zip Code"
                      onChange={(e) => setBillingZip(e.target.value)}
                      fullWidth
                      inputProps={{ tabIndex: "27" }}
                    />
                  </Grid>
                </Grid>
              </>
            )}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <h3 className={classes.requiredDisclaimer}>
                  * Last Name or Buisiness Name Required
                </h3>
              </Grid>
              {billingiscommercial && (
                <Grid item xs={6}>
                  <h3 className={classes.checkbox}>
                    Add Billing Information:
                    <Checkbox
                      name="addBillingInfo"
                      color="primary"
                      checked={addBillingInfo}
                      onChange={(event) =>
                        setAddBillingInfoOpen(event.target.checked)
                      }
                    />
                  </h3>
                </Grid>
              )}
            </Grid>

            <Grid
              container
              alignItems="flex-start"
              justifyContent="flex-end"
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
                color="primary"
                variant="contained"
                onClick={() => closeAddClientModal()}
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

const mapDispatchToProps = (dispatch) => ({
  addClientStart: (client) => dispatch(addClientStart(client)),
});

export default connect(null, mapDispatchToProps)(AddNewClient);
