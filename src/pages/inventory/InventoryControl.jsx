import React from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 208,
    overflowY: "scroll",
  },
  label: {
    paddingBottom: theme.spacing(0.5),
  },
}));

const InventoryControl = ({
  partSelected,
  isContainersLoaded,
  inventoryContainers,
}) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12}>
        {inventoryContainers.inventoryContainers
          .sort((a, b) => a.containerName.localeCompare(b.containerName))
          .map((container, index) => (
            <Grid
              container
              key={index}
              direction="row"
              justifyContent="center"
              alignItems="flex-end"
            >
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  noWrap
                  align="center"
                  className={classes.label}
                >
                  {`${container.containerName}:`}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id={partSelected + index}
                  label="Quantity"
                  fullWidth
                />
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default InventoryControl;
