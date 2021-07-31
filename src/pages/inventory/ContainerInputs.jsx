import React, { useState } from "react";

import { updateInventoryContainerStart } from "../../redux/inventoryContainers/inventoryContainers.actions";
import { connect } from "react-redux";

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textFieldSpacing: {
    paddingRight: theme.spacing(0.5),
  },
  buttonSpacing: {
    marginLeft: theme.spacing(2),
    paddingLeft: theme.spacing(1.5),
  },
}));

const ContainerInputs = ({
  index,
  container,
  partSelected,
  updateInventoryContainer,
}) => {
  const classes = useStyles();

  const isIncluded = (partList, part) => {
    const unit = partList.find(
      ({ partNumber }) => partNumber === part.partNumber
    );
    if (unit) {
      return unit.quantity;
    } else {
      return 0;
    }
  };

  const [quantity, setQuantity] = useState(
    isIncluded(container.partsList, partSelected)
  );

  const handleContainerQuantityUpdates = () => {
    const unit = container.partsList.find(
      ({ partNumber }) => partNumber === partSelected.partNumber
    );
    const unitIndex = container.partsList.findIndex(
      ({ partNumber }) => partNumber === partSelected.partNumber
    );

    if (unit === undefined) {
      const newPartToUpdate = {
        category: partSelected.category ? partSelected.category : "Service",
        crossReference: partSelected.crossReference
          ? partSelected.crossReference
          : [],
        partCost: partSelected.partCost ? partSelected.partCost : 0,
        partDataDate: partSelected.partDataDate
          ? partSelected.partDataDate
          : new Date().toLocaleString(),
        partDataServicer: partSelected.partDataServicer
          ? partSelected.partDataServicer
          : "",
        partDescription: partSelected.partDescription
          ? partSelected.partDescription
          : "",
        partLabor: partSelected.partLabor ? partSelected.partLabor : 0.0,
        partNotes: partSelected.partNotes ? partSelected.partNotes : "",
        partNumber: partSelected.partNumber ? partSelected.partNumber : "",
        partVendor: partSelected.partVendor ? partSelected.partVendor : "",
        quantity: Number.parseInt(quantity ? quantity : 0),
        url: partSelected.url ? partSelected.url : "",
      };
      container.partsList.push(newPartToUpdate);
      updateInventoryContainer(container);
    } else {
      if (quantity === "0") {
        container.partsList.splice(unitIndex, 1);
        updateInventoryContainer(container);
      } else {
        const existingPartToUpdate = {
          category: unit.category,
          crossReference: unit.crossReference,
          partCost: unit.partCost,
          partDataDate: unit.partDataDate,
          partDataServicer: unit.partDataServicer,
          partDescription: unit.partDescription,
          partLabor: unit.partLabor,
          partNotes: unit.partNotes,
          partNumber: unit.partNumber,
          partVendor: unit.partVendor,
          quantity: Number.parseInt(quantity),
          url: unit.url,
        };
        container.partsList.splice(unitIndex, 1);
        container.partsList.push(existingPartToUpdate);
        updateInventoryContainer(container);
      }
    }
  };

  return (
    <Grid
      container
      key={index}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={6}>
        <Typography variant="body1" noWrap align="center">
          {`${container.containerName}:`}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <TextField
          type="number"
          name="quantity"
          label="Quantity"
          value={quantity}
          InputProps={{
            inputProps: { min: 0, style: { textAlign: "center" } },
          }}
          className={classes.textFieldSpacing}
          margin="dense"
          variant="outlined"
          onChange={(e) => setQuantity(e.target.value)}
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          type="button"
          size="small"
          color="primary"
          variant="contained"
          className={classes.buttonSpacing}
          startIcon={<ArrowUpwardIcon />}
          onClick={() => handleContainerQuantityUpdates()}
        >
          Update
        </Button>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateInventoryContainer: (container) =>
    dispatch(updateInventoryContainerStart(container)),
});

export default connect(null, mapDispatchToProps)(ContainerInputs);
