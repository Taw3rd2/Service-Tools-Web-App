import React from "react";

import { currencyFormat } from "../../utils/currencyUtils";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(3),
    border: "1px solid black",
    borderRadius: "5px",
  },
  title: {
    margin: theme.spacing(1),
    color: "teal",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    fontSize: 18,
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 18,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}))(TableCell);

const StyledTableCellPrint = withStyles((theme) => ({
  head: {
    fontSize: 14,
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    cursor: "pointer",
  },
}))(TableRow);

const columns = [
  { id: "quantity", label: "Qty", minwidth: 50 },
  { id: "partDescription", label: "Description", minwidth: 350 },
  { id: "partNumber", label: "Part Number", minwidth: 150 },
  { id: "partVendor", label: "Vendor", minwidth: 150 },
  { id: "vendorContact", label: "Contact", minwidth: 150 },
  { id: "vendorContactPhone", label: "Contact #", minwidth: 150 },
  { id: "inStock", label: "In Stock?", minwidth: 150 },
  { id: "partCost", label: "Part Cost", minwidth: 150 },
  { id: "totalCost", label: "Total Cost", minwidth: 150 },
  { id: "customerCost", label: "Customer Cost", minwidth: 150 },
];

const printColumns = [
  { id: "quantity", label: "Qty", align: "left" },
  { id: "partDescription", label: "Desc", align: "left" },
  { id: "partNumber", label: "Part #", align: "left" },
  { id: "partVendor", label: "Vendor", align: "left" },
  { id: "vendorContact", label: "Contact", align: "left" },
  { id: "vendorContactPhone", label: "Contact #", align: "left" },
  { id: "inStock", label: "In Stock?", align: "left" },
  { id: "partCost", label: "Part Cost", align: "left" },
  { id: "totalCost", label: "Total Cost", align: "left" },
  { id: "customerCost", label: "Cust Cost", align: "left" },
];

const PartsList = ({ openEditPartModal, openAddPartModal, parts }) => {
  const matchesPrint = useMediaQuery("print");
  const classes = useStyles();

  const getPartAndOpenModal = (part, index) => {
    const partToEdit = { ...part };
    partToEdit.index = index;
    openEditPartModal(partToEdit);
  };

  return (
    <>
      {matchesPrint ? (
        <Paper className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Parts
          </Typography>
          <TableContainer>
            <Table stickyHeader aria-label="maintenance list table">
              <TableHead>
                <StyledTableRow>
                  {printColumns.map((column) => (
                    <StyledTableCellPrint
                      key={column.id}
                      align={column.align}
                      style={{ backgroundColor: "white", color: "teal" }}
                    >
                      {column.label}
                    </StyledTableCellPrint>
                  ))}
                </StyledTableRow>
              </TableHead>
              {parts.length === 0 ? (
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCellPrint></StyledTableCellPrint>
                    <StyledTableCellPrint>No Parts</StyledTableCellPrint>
                    <StyledTableCellPrint></StyledTableCellPrint>
                    <StyledTableCellPrint></StyledTableCellPrint>
                    <StyledTableCellPrint></StyledTableCellPrint>
                    <StyledTableCellPrint></StyledTableCellPrint>
                    <StyledTableCellPrint></StyledTableCellPrint>
                    <StyledTableCellPrint></StyledTableCellPrint>
                    <StyledTableCellPrint></StyledTableCellPrint>
                    <StyledTableCellPrint></StyledTableCellPrint>
                  </StyledTableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {parts.map((part, index) => (
                    <StyledTableRow
                      key={index}
                      onClick={() => getPartAndOpenModal(part, index)}
                    >
                      <StyledTableCellPrint>
                        {part.quantity}
                      </StyledTableCellPrint>
                      <StyledTableCellPrint>
                        {part.partDescription}
                      </StyledTableCellPrint>
                      <StyledTableCellPrint>
                        {part.partNumber}
                      </StyledTableCellPrint>
                      <StyledTableCellPrint>
                        {part.partVendor}
                      </StyledTableCellPrint>
                      <StyledTableCellPrint>
                        {part.vendorContact}
                      </StyledTableCellPrint>
                      <StyledTableCellPrint>
                        {part.vendorContactPhone}
                      </StyledTableCellPrint>
                      <StyledTableCellPrint>
                        {part.inStock}
                      </StyledTableCellPrint>
                      <StyledTableCellPrint>
                        {currencyFormat(part.partCost)}
                      </StyledTableCellPrint>
                      <StyledTableCellPrint>
                        {currencyFormat(part.totalCost)}
                      </StyledTableCellPrint>
                      <StyledTableCellPrint>
                        {currencyFormat(part.customerCost)}
                      </StyledTableCellPrint>
                    </StyledTableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Parts
          </Typography>
          <TableContainer>
            <Table stickyHeader aria-label="maintenance list table">
              <TableHead>
                <StyledTableRow>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{ backgroundColor: "white", color: "teal" }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              </TableHead>
              {parts.length === 0 ? (
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCellPrint></StyledTableCellPrint>
                    <StyledTableCellPrint>No Parts</StyledTableCellPrint>
                    <StyledTableCellPrint></StyledTableCellPrint>
                    <StyledTableCellPrint></StyledTableCellPrint>
                    <StyledTableCellPrint></StyledTableCellPrint>
                    <StyledTableCellPrint></StyledTableCellPrint>
                    <StyledTableCellPrint></StyledTableCellPrint>
                    <StyledTableCellPrint></StyledTableCellPrint>
                    <StyledTableCellPrint></StyledTableCellPrint>
                    <StyledTableCellPrint></StyledTableCellPrint>
                  </StyledTableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {parts.map((part, index) => (
                    <StyledTableRow
                      key={index}
                      onClick={() => getPartAndOpenModal(part, index)}
                    >
                      <StyledTableCell>{part.quantity}</StyledTableCell>
                      <StyledTableCell>{part.partDescription}</StyledTableCell>
                      <StyledTableCell>{part.partNumber}</StyledTableCell>
                      <StyledTableCell>{part.partVendor}</StyledTableCell>
                      <StyledTableCell>{part.vendorContact}</StyledTableCell>
                      <StyledTableCell>
                        {part.vendorContactPhone}
                      </StyledTableCell>
                      <StyledTableCell>{part.inStock}</StyledTableCell>
                      <StyledTableCell>
                        {currencyFormat(part.partCost)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {currencyFormat(part.totalCost)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {currencyFormat(part.customerCost)}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          <Grid
            container
            alignItems="flex-start"
            justifyContent="flex-end"
            direction="row"
          >
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
              onClick={() => openAddPartModal()}
            >
              Add Part
            </Button>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default PartsList;
