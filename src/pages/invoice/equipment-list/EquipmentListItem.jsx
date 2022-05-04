import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  border: {
    //border: "2px solid black",
    paddingLeft: "10px",
    //margin: "5px",
  },
  label: {
    fontStyle: "italic",
    marginLeft: "10px",
  },
  item: {
    marginLeft: "10px",
  },
}));

const EquipmentListItem = ({ brand, model, serial, name }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.border}>
      {name && (
        <Grid item xs>
          <Typography variant="caption" className={classes.label}>
            Unit
          </Typography>
          <Typography variant="body1" className={classes.item}>
            {name}
          </Typography>
        </Grid>
      )}
      {brand && (
        <Grid item xs>
          <Typography variant="caption" className={classes.label}>
            Brand Name
          </Typography>
          <Typography variant="body1" className={classes.item}>
            {brand}
          </Typography>
        </Grid>
      )}
      {model && (
        <Grid item xs>
          <Typography variant="caption" className={classes.label}>
            Model Number
          </Typography>
          <Typography variant="body1" className={classes.item}>
            {model}
          </Typography>
        </Grid>
      )}
      {serial && (
        <Grid item xs>
          <Typography variant="caption" className={classes.label}>
            Serial Number
          </Typography>
          <Typography variant="body1" className={classes.item}>
            {serial}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default EquipmentListItem;
