import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  spacing: {
    marginLeft: "30px",
  },
}));

const NetThirtyPayment = ({ data }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.spacing}>
      <Grid item xs={12}>
        <Typography variant="body1">
          Customer Agrees To Pay Within 30 Days
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NetThirtyPayment;
