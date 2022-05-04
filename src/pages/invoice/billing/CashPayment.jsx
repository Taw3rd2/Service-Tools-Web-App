import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { toCurrency } from "../../../utils/currencyUtils";

const useStyles = makeStyles(() => ({
  spacing: {
    marginLeft: "30px",
  },
}));

const CashPayment = ({ data }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.spacing}>
      <Grid item xs={12}>
        {data.halfDown.type === "cash" && (
          <Typography variant="body1">
            {`Cash paid for half down: ${toCurrency(data.halfDown.amount)}`}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        {data.balanceDue.type === "cash" && (
          <Typography variant="body1">
            {`Cash paid for balanceDue: ${toCurrency(data.balanceDue.amount)}`}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default CashPayment;
