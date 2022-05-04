import React from "react";

import firebase from "firebase/app";
import "firebase/firestore";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 60,
  },
}));

const InvoiceNumber = ({
  userCreatedInvoiceNumber,
  setUserCreatedInvoiceNumber,
  invoiceNumberPrefix,
  setInvoiceNumberPrefix,
}) => {
  const classes = useStyles();

  const getPreGeneratedInvoiceNumber = () => {
    const db = firebase.firestore();
    var collectionRef = db.collection("invoiceNumbers");
    var documentRef = db
      .collection("invoiceNumbers")
      .doc("XKpxOvA0MSTyQDWVm4ct");

    collectionRef
      .get()
      .then((querySnapshot) => {
        const final = [];
        querySnapshot.forEach((doc) => {
          const rawValue = doc.data().number;
          final.push(rawValue);
        });
        setUserCreatedInvoiceNumber(final[0]);
      })
      .then(() =>
        documentRef.update({
          number: firebase.firestore.FieldValue.increment(1),
        })
      )
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  return (
    <>
      <Grid container>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Would you like to use a preset invoice number, or generate a new
            one?
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="center">
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="select-job-prefix">Prefix</InputLabel>
            <Select
              labelId="select-invoicePrefix"
              id="select-invoice-prefix"
              value={invoiceNumberPrefix}
              margin="none"
              onChange={(e) => setInvoiceNumberPrefix(e.target.value)}
            >
              <MenuItem value={"H"}>H</MenuItem>
              <MenuItem value={"HT"}>HT</MenuItem>
              <MenuItem value={"PR"}>PR</MenuItem>
              <MenuItem value={"M"}>M</MenuItem>
              <MenuItem value={"CM"}>CM</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            label="Invoice Number"
            type="text"
            value={userCreatedInvoiceNumber}
            onChange={(e) => setUserCreatedInvoiceNumber(e.target.value)}
            margin="none"
            className={classes.formControl}
          />
        </Grid>
        <Grid item>
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
    </>
  );
};

export default InvoiceNumber;
