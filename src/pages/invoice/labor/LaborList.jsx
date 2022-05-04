import React from "react";

import QuotedLaborItems from "./QuotedLaborItems";
import BillableLaborItems from "./BillableLaborItems";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  topMargin: {
    marginTop: "15px",
  },
  label: {
    color: "red",
    fontStyle: "italic",
    paddingLeft: "12px",
  },
}));

const LaborList = ({ data }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.topMargin}>
      <Grid item xs={12}>
        <Typography variant="caption" className={classes.label}>
          Labor
        </Typography>
      </Grid>
      <Grid container item justifyContent="center">
        {data && data.isPreDefinedQuote ? (
          <QuotedLaborItems data={data} />
        ) : (
          <BillableLaborItems data={data} />
        )}
      </Grid>
    </Grid>
  );
};

export default LaborList;
