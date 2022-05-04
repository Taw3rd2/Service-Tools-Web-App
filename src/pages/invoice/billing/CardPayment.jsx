import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { toCurrency } from "../../../utils/currencyUtils";

const useStyles = makeStyles(() => ({
  spacing: {
    marginLeft: "30px",
  },
}));

const CardPayment = ({ data }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.spacing}>
      <Grid item xs={12}>
        <Grid item>
          {data.halfDown.type === "card" && (
            <Typography variant="body1">
              {`Half Down Card Amount: ${toCurrency(data.halfDown.amount)}`}
            </Typography>
          )}
        </Grid>
        <Grid item>
          {data.halfDown.type === "card" && (
            <Typography variant="body1">
              {`Half Down Card Number: ${data.halfDown.creditCardNumber}`}
            </Typography>
          )}
        </Grid>
        <Grid item>
          {data.halfDown.type === "card" && (
            <Typography variant="body1">
              {`Half Down Card Exp Date: ${data.halfDown.expirationDate}`}
            </Typography>
          )}
        </Grid>
        <Grid item>
          {data.halfDown.type === "card" && (
            <Typography variant="body1">
              {`Half Down Card V-Code: ${data.halfDown.vCode}`}
            </Typography>
          )}
        </Grid>
        <Grid item>
          {data.balanceDue.type === "card" && (
            <Typography variant="body1">
              {`Balance Due Card Amount: ${toCurrency(data.balanceDue.amount)}`}
            </Typography>
          )}
        </Grid>
        <Grid item>
          {data.balanceDue.type === "card" && (
            <Typography variant="body1">
              {`Balance Due Card Number: ${data.balanceDue.creditCardNumber}`}
            </Typography>
          )}
        </Grid>
        <Grid item>
          {data.balanceDue.type === "card" && (
            <Typography variant="body1">
              {`Balance Due Card Exp Date: ${data.balanceDue.expirationDate}`}
            </Typography>
          )}
        </Grid>
        <Grid item>
          {data.balanceDue.type === "card" && (
            <Typography variant="body1">
              {`Balance Due Card V-Code: ${data.balanceDue.vCode}`}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CardPayment;
