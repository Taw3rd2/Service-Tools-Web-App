import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  border: {
    paddingLeft: "15px",
  },
  label: {
    color: "red",
    fontStyle: "italic",
    paddingLeft: "12px",
  },
  topMargin: {
    marginTop: "15px",
  },
}));

const InvoiceWarranty = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.topMargin}>
      <Grid item xs={12}>
        <Typography variant="caption" className={classes.label}>
          Warranty
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.border}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="caption">
              All materials, parts, and equipment are warranted by the
              manufacturers or suppliers written warranty only. All labor
              performed my Hi-Temp Heating & Cooling. Inc is warranted for 30
              days or as otherwise indicated in writing. Hi-temp Heating &
              Cooling. Inc makes no other warranties express or implied, and its
              agents or technicians are not authorized to make any such
              warranties on behalf of Hi-Temp Heating & Cooling. Inc.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InvoiceWarranty;
