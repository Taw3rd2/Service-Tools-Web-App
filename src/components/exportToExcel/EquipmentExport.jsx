import React from "react";
import ExcelJs from "exceljs";
import { getFormattedDateAndTime } from "../../utils/dateUtils";

import { Button } from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
}));

const EquipmentExport = ({ client, equipment }) => {
  const classes = useStyles();

  const exportToExcel = (data, client) => {
    let sheetName = "EquipmentList.xlsx";

    let workbook = new ExcelJs.Workbook();
    let sheet = workbook.addWorksheet(sheetName, {
      views: [{ showGridLines: true }],
    });

    sheet.columns = [
      { header: "Equipment Name", key: "equipmentName", width: 25 },
      { header: "Equipment Brand", key: "equipmentBrand", width: 25 },
      { header: "Equipment Model", key: "equipmentModel", width: 25 },
      { header: "Equipment Serial", key: "equipmentSerial", width: 25 },
      { header: "Maintenance Exp", key: "equipmentContract", width: 25 },
      { header: "Parts Warranty", key: "equipmentWarranty", width: 25 },
      { header: "Labor Warranty", key: "laborWarranty", width: 25 },
      { header: "Equipment Voltage", key: "equipmentVoltage", width: 25 },
      { header: "Equipment Btu", key: "equipmentBtu", width: 25 },
      { header: "Equipment Fuel", key: "equipmentFuel", width: 25 },
      { header: "Equipment Eff", key: "equipmentEff", width: 25 },
    ];

    data.forEach((singleData) => {
      sheet.addRow(singleData);
    });

    sheet.duplicateRow(1, 3, true);
    sheet.getRow(1).values = [
      client.firstname
        ? `${client.firstname}, ${client.lastname}`
        : `${client.lastname}`,
    ];
    sheet.getRow(2).values = [
      `Equipment as of: ${getFormattedDateAndTime(new Date())}`,
    ];

    sheet.getRow(3).values = [];

    sheet.getRow("1").font = {
      size: 14,
      bold: true,
    };

    sheet.getRow("2").font = {
      size: 14,
      bold: true,
    };

    const writeFile = (fileName, content) => {
      const link = document.createElement("a");
      const blob = new Blob([content], {
        type: "application/vnd.ms-excel;charset=utf-8;",
      });
      link.download = fileName;
      link.href = URL.createObjectURL(blob);
      link.click();
    };

    workbook.xlsx.writeBuffer().then((buffer) => {
      writeFile(sheetName, buffer);
    });
  };

  return (
    <Button
      color="primary"
      variant="contained"
      className={classes.button}
      startIcon={<PublishIcon />}
      onClick={() => {
        exportToExcel(equipment, client);
      }}
    >
      Export To Excel
    </Button>
  );
};

export default EquipmentExport;
