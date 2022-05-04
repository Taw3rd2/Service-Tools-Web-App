import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { toCurrency } from "../../../utils/currencyUtils";

const useStyles = makeStyles(() => ({
  border: {
    //border: "2px solid black",
    paddingLeft: "15px",
  },
  label: {
    fontStyle: "italic",
    marginLeft: "10px",
  },
  item: {
    marginLeft: "10px",
  },
  totalsItem: {
    marginLeft: "10px",
    fontSize: "18px",
    fontWeight: "bold",
  },
}));

const InvoiceTotalsListItems = ({ data }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.border}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {data.isPreDefinedQuote ? (
            <>
              {/*Pre Defined Quote*/}
              <Grid container item xs={7} justifyContent="flex-start">
                <Typography variant="body1" className={classes.item}>
                  Pre Defined Quote:
                </Typography>
              </Grid>
              <Grid container item xs={5} justifyContent="flex-end">
                <Typography variant="body1" className={classes.item}>
                  {toCurrency(data.subTotalOfInvoice)}
                </Typography>
              </Grid>
            </>
          ) : (
            <>
              {/*Material and labor*/}
              <Grid container item xs={7} justifyContent="flex-start">
                <Typography variant="body1" className={classes.item}>
                  Material:
                </Typography>
              </Grid>
              <Grid container item xs={5} justifyContent="flex-end">
                <Typography variant="body1" className={classes.item}>
                  $234.23
                </Typography>
              </Grid>
              <Grid container item xs={7} justifyContent="flex-start">
                <Typography variant="body1" className={classes.item}>
                  Labor:
                </Typography>
              </Grid>
              <Grid container item xs={5} justifyContent="flex-end">
                <Typography variant="body1" className={classes.item}>
                  {toCurrency(data.totalLabor)}
                </Typography>
              </Grid>
            </>
          )}

          {/*Subtotal*/}
          <Grid container item xs={7} justifyContent="flex-start">
            <Typography variant="body1" className={classes.item}>
              Subtotal:
            </Typography>
          </Grid>
          <Grid container item xs={5} justifyContent="flex-end">
            <Typography variant="body1" className={classes.item}>
              {toCurrency(data.subTotalOfInvoice)}
            </Typography>
          </Grid>

          {/*Shipping*/}
          <Grid container item xs={7} justifyContent="flex-start">
            <Typography variant="body1" className={classes.item}>
              Shipping:
            </Typography>
          </Grid>
          <Grid container item xs={5} justifyContent="flex-end">
            <Typography variant="body1" className={classes.item}>
              {toCurrency(data.totalShipping)}
            </Typography>
          </Grid>

          {/*Discount*/}
          <Grid container item xs={7} justifyContent="flex-start">
            <Typography variant="body1" className={classes.item}>
              Discount:
            </Typography>
          </Grid>
          <Grid container item xs={5} justifyContent="flex-end">
            <Typography variant="body1" className={classes.item}>
              -{toCurrency(data.totalDiscounts)}
            </Typography>
          </Grid>

          {/*Spacer*/}
          <Grid container item xs={7} justifyContent="flex-start"></Grid>
          <Grid container item xs={5} justifyContent="flex-end"></Grid>

          {/*Spacer*/}
          <Grid container item xs={7} justifyContent="flex-start"></Grid>
          <Grid container item xs={5} justifyContent="flex-end"></Grid>

          {/*Totals*/}
          <Grid container item xs={7} justifyContent="flex-start">
            <Typography variant="body1" className={classes.totalsItem}>
              Total:
            </Typography>
          </Grid>
          <Grid container item xs={5} justifyContent="flex-end">
            <Typography variant="body1" className={classes.totalsItem}>
              {toCurrency(data.totalQuote)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InvoiceTotalsListItems;
