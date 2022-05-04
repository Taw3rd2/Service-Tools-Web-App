import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
//import { toCurrency } from "../../../utils/currencyUtils";

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
}));

const QuotedLaborItems = ({ data }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.border}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Typography variant="caption" className={classes.label}>
              Qty
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="caption" className={classes.label}>
              Technician's
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="caption" className={classes.label}>
              {""}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QuotedLaborItems;
