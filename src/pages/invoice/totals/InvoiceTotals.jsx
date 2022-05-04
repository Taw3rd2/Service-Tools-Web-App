import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import InvoiceTotalsListItems from "./InvoiceTotalsListItems";

const useStyles = makeStyles((theme) => ({
  label: {
    fontStyle: "italic",
    paddingLeft: "12px",
    color: "red",
  },
  topMargin: {
    marginTop: "15px",
  },
}));

const InvoiceTotals = ({ data }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.topMargin}>
      <Grid item xs={12}>
        <Typography variant="caption" className={classes.label}>
          Totals
        </Typography>
      </Grid>
      <Grid container item>
        <InvoiceTotalsListItems data={data} />
        {/* {data && data.isPreDefinedQuote ? (
            <QuotedListItems data={data} />
                ) : (
            <BillableListItem data={data} />
        )} */}
      </Grid>
    </Grid>
  );
};

export default InvoiceTotals;
