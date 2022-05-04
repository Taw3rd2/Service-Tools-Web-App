import React from "react";

import BillableListItem from "./BillableListItem";
import QuotedListItems from "./QuotedListItems";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  label: {
    color: "red",
    fontStyle: "italic",
    paddingLeft: "12px",
  },
  topMargin: {
    marginTop: "15px",
  },
}));

const BillableItems = ({ data }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.topMargin}>
      <Grid item xs={12}>
        <Typography variant="caption" className={classes.label}>
          Billable Items
        </Typography>
      </Grid>
      <Grid container item justifyContent="center">
        {data && data.isPreDefinedQuote ? (
          <QuotedListItems data={data} />
        ) : (
          <BillableListItem data={data} />
        )}
      </Grid>
    </Grid>
  );
};

export default BillableItems;
