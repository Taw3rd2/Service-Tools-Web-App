import React from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  textFields: {
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "2px",
    paddingRight: "2px",
  },
}));

const CustomerInfo = ({
  customerName,
  setCustomerName,
  customerAddress,
  setCustomerAddress,
  jobNumber,
  setJobNumber,
  quoteDate,
  setQuoteDate,
  equipmentName,
  setEquipmentName,
  equipmentBrand,
  setEquipmentBrand,
  equipmentModel,
  setEquipmentModel,
  equipmentSerial,
  setEquipmentSerial,
}) => {
  const matchesPrint = useMediaQuery("print");
  const classes = useStyles();

  return (
    <>
      {matchesPrint ? (
        <Grid container spacing={0}>
          <Grid item xs={6} className={classes.textFields}>
            <TextField
              label="Customer Name"
              value={customerName}
              fullWidth
              required
              onChange={(event) => setCustomerName(event.target.value)}
              inputProps={{ tabIndex: "1" }}
            />
          </Grid>
          <Grid item xs={6} className={classes.textFields}>
            <TextField
              label="Equipment Name"
              value={equipmentName}
              fullWidth
              required
              onChange={(event) => setEquipmentName(event.target.value)}
              inputProps={{ tabIndex: "5" }}
            />
          </Grid>
          <Grid item xs={6} className={classes.textFields}>
            <TextField
              label="Customer Address"
              value={customerAddress}
              fullWidth
              required
              onChange={(event) => setCustomerAddress(event.target.value)}
              inputProps={{ tabIndex: "2" }}
            />
          </Grid>
          <Grid item xs={6} className={classes.textFields}>
            <TextField
              label="Equipment Brand"
              value={equipmentBrand}
              fullWidth
              onChange={(event) => setEquipmentBrand(event.target.value)}
              inputProps={{ tabIndex: "6" }}
            />
          </Grid>
          <Grid item xs={6} className={classes.textFields}>
            <TextField
              label="Job Number"
              value={jobNumber}
              fullWidth
              required
              onChange={(event) => setJobNumber(event.target.value)}
              inputProps={{ tabIndex: "3" }}
            />
          </Grid>
          <Grid item xs={6} className={classes.textFields}>
            <TextField
              label="Equipment Model"
              value={equipmentModel}
              fullWidth
              onChange={(event) => setEquipmentModel(event.target.value)}
              inputProps={{ tabIndex: "7" }}
            />
          </Grid>
          <Grid item xs={6} className={classes.textFields}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                format="MM/dd/yyyy"
                id="quoteDate"
                label="Quote Date"
                value={quoteDate}
                onChange={(date) => setQuoteDate(date)}
                inputProps={{ tabIndex: "4" }}
                fullWidth
                required
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6} className={classes.textFields}>
            <TextField
              label="Equipment Serial"
              value={equipmentSerial}
              fullWidth
              onChange={(event) => setEquipmentSerial(event.target.value)}
              inputProps={{ tabIndex: "8" }}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              label="Customer Name"
              value={customerName}
              fullWidth
              required
              onChange={(event) => setCustomerName(event.target.value)}
              inputProps={{ tabIndex: "1" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Equipment Name"
              value={equipmentName}
              fullWidth
              required
              onChange={(event) => setEquipmentName(event.target.value)}
              inputProps={{ tabIndex: "5" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Customer Address"
              value={customerAddress}
              fullWidth
              required
              onChange={(event) => setCustomerAddress(event.target.value)}
              inputProps={{ tabIndex: "2" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Equipment Brand"
              value={equipmentBrand}
              fullWidth
              onChange={(event) => setEquipmentBrand(event.target.value)}
              inputProps={{ tabIndex: "6" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Job Number"
              value={jobNumber}
              fullWidth
              required
              onChange={(event) => setJobNumber(event.target.value)}
              inputProps={{ tabIndex: "3" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Equipment Model"
              value={equipmentModel}
              fullWidth
              onChange={(event) => setEquipmentModel(event.target.value)}
              inputProps={{ tabIndex: "7" }}
            />
          </Grid>
          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                format="MM/dd/yyyy"
                id="quoteDate"
                label="Quote Date"
                value={quoteDate}
                onChange={(date) => setQuoteDate(date)}
                inputProps={{ tabIndex: "4" }}
                fullWidth
                required
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Equipment Serial"
              value={equipmentSerial}
              fullWidth
              onChange={(event) => setEquipmentSerial(event.target.value)}
              inputProps={{ tabIndex: "8" }}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CustomerInfo;
