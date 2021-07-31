import React from "react";

import ContainerInputs from "./ContainerInputs";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 208,
    overflowY: "scroll",
  },
}));

const InventoryControl = ({ partSelected, inventoryContainers }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12}>
        {inventoryContainers.inventoryContainers
          .sort((a, b) => a.containerName.localeCompare(b.containerName))
          .map((container, index) => (
            <ContainerInputs
              key={container.id}
              index={index}
              container={container}
              partSelected={partSelected}
            />
          ))}
      </Grid>
    </Grid>
  );
};

export default InventoryControl;
