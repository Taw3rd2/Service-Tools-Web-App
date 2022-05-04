import React from "react";

import BillingOptions from "./BillingOptions";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { toCurrency } from "../../../utils/currencyUtils";

const useStyles = makeStyles(() => ({
  subTitle: {
    marginTop: "32px",
  },
  indentation: {
    marginLeft: "16px",
  },
}));

const BillingSection = ({
  getTotalQuote,
  halfDown,
  handleHalfDownUpdates,
  paymentSelector,
  handlePaymentSelectorChange,
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} className={classes.subTitle}>
        <Typography variant="h5" gutterBottom>
          How would you like to handle Billing for this invoice?
        </Typography>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item>
          <RadioGroup
            value={paymentSelector}
            onChange={handlePaymentSelectorChange}
          >
            <FormControlLabel
              value="a"
              control={<Radio />}
              label="Just start the invoice"
            />
            <FormControlLabel
              value="b"
              control={<Radio />}
              label="Half down or whatever, and balance due upon completion"
            />
            <FormControlLabel
              value="c"
              control={<Radio />}
              label="Pay the invoice in full"
            />
            <FormControlLabel value="d" control={<Radio />} label="Net 30" />
          </RadioGroup>
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid item>
                <Typography variant="h5" className={classes.indentation}>
                  {`Total Due: ${toCurrency(getTotalQuote())}`}
                </Typography>
              </Grid>
              {paymentSelector === "a" && (
                <Grid item>
                  <Typography variant="body1" className={classes.indentation}>
                    Technician will handle payment in the field.
                  </Typography>
                </Grid>
              )}
              {paymentSelector === "b" && (
                <>
                  <Grid item className={classes.indentation}>
                    <Typography variant="body1">
                      {`Half of total invoice: ${toCurrency(
                        getTotalQuote() / 2
                      )}`}
                    </Typography>
                  </Grid>
                  <div className={classes.indentation}>
                    <BillingOptions
                      halfDown={halfDown}
                      handleHalfDownUpdates={handleHalfDownUpdates}
                    />
                  </div>
                </>
              )}
              {paymentSelector === "c" && (
                <div className={classes.indentation}>
                  <BillingOptions
                    halfDown={halfDown}
                    handleHalfDownUpdates={handleHalfDownUpdates}
                  />
                </div>
              )}
              {paymentSelector === "d" && (
                <Grid item>
                  <Typography variant="body1" className={classes.indentation}>
                    Net Thirty Selected
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default BillingSection;
