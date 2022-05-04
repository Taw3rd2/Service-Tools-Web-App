import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  topMargin: {
    marginTop: "15px",
  },
  border: {
    paddingLeft: "15px",
  },
  label: {
    color: "red",
    fontStyle: "italic",
    paddingLeft: "12px",
  },
  spacer: {
    paddingBottom: "200px",
  },
}));

const WorkDescription = ({ data }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.topMargin}>
      <Grid item xs={12}>
        <Typography variant="caption" className={classes.label}>
          Description of work performed
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.border}>
        {data.workDescription ? (
          <Typography variant="body1">{data.workDescription}</Typography>
        ) : (
          <Typography variant="body1" className={classes.spacer}>
            Nothing done yet.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default WorkDescription;
