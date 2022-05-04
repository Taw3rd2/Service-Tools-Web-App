import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  header: {
    marginTop: "30px",
  },
  label: {
    color: "red",
    fontStyle: "italic",
    marginLeft: "10px",
  },
  item: {
    fontSize: "18px",
    marginLeft: "20px",
  },
}));

const InvoiceCustomerInformation = ({ data }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container className={classes.header}>
          <Grid item xs={6}>
            <Grid container item>
              <Typography variant="body1" className={classes.label}>
                Job Location:
              </Typography>
            </Grid>
            <Grid container item justifyContent="flex-start">
              {data.client.firstname ? (
                <Typography variant="body1" className={classes.item}>
                  {data.client.firstname + " " + data.client.lastname}
                </Typography>
              ) : (
                <Typography variant="body1" className={classes.item}>
                  {data.client.lastname}
                </Typography>
              )}
            </Grid>
            <Grid container item justifyContent="flex-start">
              {data.client.street ? (
                <Typography variant="body1" className={classes.item}>
                  {data.client.street}
                </Typography>
              ) : (
                <Typography variant="body1" className={classes.item}>
                  No address entered
                </Typography>
              )}
            </Grid>
            <Grid container item justifyContent="flex-start">
              <Typography variant="body1" className={classes.item}>
                {`${data.client.city}, ${data.client.state} ${data.client.zip}`}
              </Typography>
            </Grid>
            <Grid container item justifyContent="flex-start">
              <Typography variant="body1" className={classes.item}>
                {`${data.client.phoneName}: ${data.client.phone}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container item>
              <Typography variant="body1" className={classes.label}>
                Bill To:
              </Typography>
            </Grid>
            <Grid container item justifyContent="flex-start">
              {data.client.billingorg && (
                <Typography variant="body1" className={classes.item}>
                  {data.client.billingorg}
                </Typography>
              )}
            </Grid>
            <Grid container item justifyContent="flex-start">
              {data.client.billingstreet && (
                <Typography variant="body1" className={classes.item}>
                  {data.client.billingstreet}
                </Typography>
              )}
            </Grid>
            <Grid container item justifyContent="flex-start">
              {data.client.billingcity ||
              data.client.billingstate ||
              data.client.billingzip ? (
                <Typography variant="body1" className={classes.item}>
                  {`${data.client.billingcity}, ${data.client.billingstate} ${data.client.billingzip}`}
                </Typography>
              ) : (
                <div />
              )}
            </Grid>
            <Grid container item justifyContent="flex-start">
              {data.client.billingPrimaryName ||
              data.client.billingPrimaryPhone ? (
                <Typography variant="body1" className={classes.item}>
                  {`${data.client.billingPrimaryName}: ${data.client.billingPrimaryPhone}`}
                </Typography>
              ) : (
                <div />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InvoiceCustomerInformation;
