import React from "react";
import ReactExport from "react-export-excel";

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

const EquipmentExport = ({ equipment }) => {
  const classes = useStyles();

  return (
    <ExcelFile
      element={
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          fullWidth
        >
          Export Equipment To Excel
        </Button>
      }
      filename="Equipment"
    >
      <ExcelSheet data={clients.clients} name="Equipment">
        <ExcelColumn label="Equipment Name" value="equipmentName" />
        <ExcelColumn label="Brand" value="equipmentBrand" />
        <ExcelColumn label="Model" value="equipmentModel" />
        <ExcelColumn label="Serial" value="equipmentSerial" />
        <ExcelColumn label="Fuel/Freon" value="equipmentFuel" />
        <ExcelColumn label="Voltage" value="equipmentVoltage" />
        <ExcelColumn label="Size" value="equipmentBtu" />
        <ExcelColumn label="Efficiency" value="equipmentEff" />
        <ExcelColumn label="Maintenance Exp" value="equipmentContract" />
        <ExcelColumn label="Parts Warranty Exp" value="equipmentWarranty" />
        <ExcelColumn label="Labor Warranty Exp" value="laborWarranty" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default EquipmentExport;
