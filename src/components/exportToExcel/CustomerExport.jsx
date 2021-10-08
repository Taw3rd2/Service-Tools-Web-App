import React from "react";
import ReactExport from "react-export-excel";

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelSheet;
const ExcelColumn = ReactExport.ExcelColumn;

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

const CustomerExport = ({ clients }) => {
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
          Export Customers To Excel
        </Button>
      }
      filename="Customers"
    >
      <ExcelSheet data={clients.clients} name="Customers">
        <ExcelColumn label="First Name" value="firstname" widthCh="20" />
        <ExcelColumn label="Last Name or Business" value="lastname" />
        <ExcelColumn label="Address" value="street" />
        <ExcelColumn label="City" value="city" />
        <ExcelColumn label="State" value="state" />
        <ExcelColumn label="Zip Code" value="zip" />
        <ExcelColumn label="Phone Name" value="phoneName" />
        <ExcelColumn label="Phone Number" value="phone" />
        <ExcelColumn label="Alt Phone Name" value="altPhoneName" />
        <ExcelColumn label="Alt Phone Number" value="altphone" />
        <ExcelColumn label="Other Phone Name" value="otherPhoneName" />
        <ExcelColumn label="Other Phone Number" value="otherPhone" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default CustomerExport;
