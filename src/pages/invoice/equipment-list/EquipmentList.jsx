import React from "react";
import EquipmentListItem from "./EquipmentListItem";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  topMargin: {
    marginTop: "15px",
  },
  leftLabel: {
    color: "red",
    fontStyle: "italic",
    paddingLeft: "12px",
  },
  listItem: {},
}));

const EquipmentList = ({ data }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.topMargin}>
      <Grid item xs={12}>
        <Typography variant="caption" className={classes.leftLabel}>
          Equipment Serviced
        </Typography>
      </Grid>
      <Grid container item justifyContent="center">
        <EquipmentListItem
          brand={data.equipmentBrand}
          model={data.equipmentModel}
          serial={data.equipmentSerial}
          name={data.equipmentName}
        />
      </Grid>
    </Grid>
  );
};

export default EquipmentList;
