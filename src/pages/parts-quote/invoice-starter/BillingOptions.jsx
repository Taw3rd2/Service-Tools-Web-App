import React from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  textField: {
    width: "75%",
  },
}));

const BillingOptions = ({ halfDown, handleHalfDownUpdates }) => {
  const classes = useStyles();

  return (
    <>
      <Grid item>
        <RadioGroup
          row
          value={halfDown.type}
          onChange={handleHalfDownUpdates("type")}
          className={classes.totals}
        >
          <FormControlLabel value="card" control={<Radio />} label="Card" />
          <FormControlLabel value="check" control={<Radio />} label="Check" />
          <FormControlLabel value="cash" control={<Radio />} label="Cash" />
        </RadioGroup>
      </Grid>
      <Grid item>
        {halfDown.type === "card" && (
          <>
            <Grid item>
              <TextField
                label="Card Number"
                type="text"
                value={halfDown.creditCardNumber}
                onChange={handleHalfDownUpdates("creditCardNumber")}
                margin="none"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Expiration Date"
                type="text"
                value={halfDown.expirationDate}
                onChange={handleHalfDownUpdates("expirationDate")}
                margin="none"
              />
            </Grid>
            <Grid item>
              <TextField
                label="V Code"
                type="text"
                value={halfDown.vCode}
                onChange={handleHalfDownUpdates("vCode")}
                margin="none"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Amount"
                type="number"
                value={halfDown.amount}
                onChange={handleHalfDownUpdates("amount")}
                className={classes.textField}
                margin="none"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </>
        )}
        {halfDown.type === "check" && (
          <>
            <Grid item>
              <TextField
                label="Check Number"
                type="number"
                value={halfDown.checkNumber}
                onChange={handleHalfDownUpdates("checkNumber")}
                margin="none"
              />
            </Grid>
            <Grid item>
              <TextField
                label="Check Amount"
                type="number"
                value={halfDown.amount}
                onChange={handleHalfDownUpdates("amount")}
                margin="none"
                className={classes.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Drivers License Number"
                type="text"
                value={halfDown.driversLicenseNumber}
                onChange={handleHalfDownUpdates("driversLicenseNumber")}
                margin="none"
              />
            </Grid>
          </>
        )}
        {halfDown.type === "cash" && (
          <Grid item>
            <TextField
              label="Cash Amount"
              type="number"
              value={halfDown.amount}
              onChange={handleHalfDownUpdates("amount")}
              className={classes.textField}
              margin="none"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default BillingOptions;
