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

const PartsExport = ({ parts }) => {
  const classes = useStyles();

  const exportToExcel = (data) => {
    let sheetName = "Parts.xlsx";

    let workbook = new ExcelJs.Workbook();
    let sheet = workbook.addWorksheet(sheetName, {
      views: [{ showGridLines: true }],
    });

    sheet.headerFooter.firstHeader = "Parts";

    sheet.columns = [
      { header: "Part Number", key: "partNumber", width: 25 },
      { header: "Part Description", key: "partDescription", width: 30 },
      { header: "Hi Temp Cost", key: "partCost", width: 15 },
      { header: "Vendor", key: "partVendor", width: 15 },
      { header: "Init", key: "partDataServicer", width: 10 },
      { header: "Date Updated", key: "partDataDate", width: 21 },
      { header: "Allowed Labor", key: "partLabor", width: 18 },
      { header: "Notes", key: "partNotes", width: 25 },
      { header: "Category", key: "category", width: 13 },
      { header: "Picture URL", key: "url", width: 25 },
    ];

    data.forEach((singleData) => {
      sheet.addRow(singleData);
    });

    sheet.duplicateRow(1, 2, true);
    sheet.getRow(1).values = [
      `Parts as of: ${getFormattedDateAndTime(new Date())}`,
    ];
    sheet.getRow(2).values = [];

    sheet.getRow("1").font = {
      size: 14,
      bold: true,
    };

    sheet.getRow("3").font = {
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
      size="large"
      startIcon={<PublishIcon />}
      onClick={() => {
        exportToExcel(parts);
      }}
    >
      Export Part List to Excel
    </Button>
  );
};

export default PartsExport;
