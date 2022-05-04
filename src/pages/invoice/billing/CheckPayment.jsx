import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { toCurrency } from "../../../utils/currencyUtils";

const useStyles = makeStyles(() => ({
  spacing: {
    marginLeft: "30px",
  },
}));

const CheckPayment = ({ data }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.spacing}>
      <Grid item xs={12}>
        <Grid item>
          {data.halfDown.type === "check" && (
            <Typography variant="body1">
              {`Half Down Check Amount: ${toCurrency(data.halfDown.amount)}`}
            </Typography>
          )}
        </Grid>
        <Grid item>
          {data.halfDown.type === "check" && (
            <Typography variant="body1">
              {`Half Down Check Number: ${data.halfDown.checkNumber}`}
            </Typography>
          )}
        </Grid>
        <Grid item>
          {data.balanceDue.type === "check" && (
            <Typography variant="body1">
              {`Balance Due Check Amount: ${toCurrency(
                data.balanceDue.amount
              )}`}
            </Typography>
          )}
        </Grid>
        <Grid item>
          {data.balanceDue.type === "check" && (
            <Typography variant="body1">
              {`Balance Due Check Number: ${data.balanceDue.checkNumber}`}
            </Typography>
          )}
        </Grid>
        <Grid item>
          {data.halfDown.type === "check" ||
          data.balanceDue.type === "check" ? (
            data.halfDown.driversLicenceNumber ? (
              <Typography variant="body1">
                {`Drivers Licence Number: ${data.halfDown.driversLicenceNumber}`}
              </Typography>
            ) : (
              data.balanceDue.driversLicenceNumber && (
                <Typography variant="body1">
                  {`Drivers Licence Number: ${data.balanceDue.driversLicenceNumber}`}
                </Typography>
              )
            )
          ) : (
            {}
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckPayment;
