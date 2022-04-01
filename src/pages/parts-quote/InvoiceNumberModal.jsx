import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CloseIcon from "@material-ui/icons/Close";

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
    color: "teal",
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  formControl: {
    display: "flex",
    justifyContent: "center",
    minWidth: 120,
  },
}));

const InvoiceNumberModal = ({
  isInvoiceNumberModalOpen,
  closeInvoiceNumberModal,
}) => {
  const classes = useStyles();

  const [userCreatedInvoiceNumber, setUserCreatedInvoiceNumber] = useState("");
  const [invoiceNumberValidation, setInvoiceNumberValudation] = useState(0);
  const [jobNumberPrefix, setJobNumberPrefix] = useState("H");

  const getPreGeneratedInvoiceNumber = () => {
    const db = firebase.firestore();
    var docRef = db.collection("invoiceNumbers").doc("XKpxOvA0MSTyQDWVm4ct");

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const invoiceNumberObject = doc.data();
          if (userCreatedInvoiceNumber !== invoiceNumberValidation) {
            setUserCreatedInvoiceNumber(invoiceNumberObject.number);
            setInvoiceNumberValudation(invoiceNumberObject.number);
          }
        }
      })
      .then((doc) => {
        if (userCreatedInvoiceNumber === invoiceNumberValidation) {
          console.log("validation: ", invoiceNumberValidation);
          docRef.update("number", invoiceNumberValidation + 1);
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  return (
    <Modal
      aria-labelledby="invoice-number-modal"
      aria-describedby="invoice-number-modal-form"
      open={isInvoiceNumberModalOpen}
      onClose={closeInvoiceNumberModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isInvoiceNumberModalOpen}>
        <div className={classes.paper}>
          <form>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Would you like to use a preset invoice number, or generate a
                  new one?
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="select-job-prefix">Select Prefix</InputLabel>
                  <Select
                    labelId="select-jobPrefix"
                    id="select-job-prefix"
                    value={jobNumberPrefix}
                    margin="none"
                    onChange={(e) => setJobNumberPrefix(e.target.value)}
                  >
                    <MenuItem value={"H"}>H</MenuItem>
                    <MenuItem value={"HT"}>HT</MenuItem>
                    <MenuItem value={"PR"}>PR</MenuItem>
                    <MenuItem value={"M"}>M</MenuItem>
                    <MenuItem value={"CM"}>CM</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <TextField
                  label="Invoice Number"
                  type="text"
                  value={userCreatedInvoiceNumber}
                  onChange={(e) => setUserCreatedInvoiceNumber(e.target.value)}
                  margin="none"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  type="button"
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  onClick={() => getPreGeneratedInvoiceNumber()}
                >
                  Generate New
                </Button>
              </Grid>
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
                Create
              </Button>
              <Button
                type="button"
                color="primary"
                variant="contained"
                onClick={() => closeInvoiceNumberModal()}
                className={classes.button}
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

export default InvoiceNumberModal;
