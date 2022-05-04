import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectIsInvoicesLoaded,
  selectInvoicesList,
} from "../../redux/invoices/invoices.selectors";

import { getFormattedDateAndTime } from "../../utils/dateUtils";
import { toCurrency } from "../../utils/currencyUtils";

import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import { Add } from "@material-ui/icons";

import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 20,
  },
  body: {
    fontSize: 20,
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
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  table: {
    minWidth: 500,
    border: "1px solid black",
  },
  spacing: {
    marginTop: theme.spacing(3),
  },
}));

const GeneralLedgerPage = ({
  invoices,
  isInvoicesLoaded,
  openAddInvoiceModal,
  openDeleteInvoiceModal,
  openEditinvoiceModal,
}) => {
  const classes = useStyles();

  console.log("invoices: ", invoices);

  return (
    <Paper variant="outlined" className={classes.root}>
      <Typography variant="h5" gutterBottom>
        General Ledger
      </Typography>
      <TableContainer component={Paper} style={{ overflow: "auto " }}>
        <Table
          stickyHeader
          className={classes.table}
          size="medium"
          aria-label="general-ledger-table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell component="th" align="left">
                Date
              </StyledTableCell>
              <StyledTableCell component="th" align="center">
                Customer Name
              </StyledTableCell>
              <StyledTableCell component="th" align="center">
                Technician
              </StyledTableCell>
              <StyledTableCell component="th" align="right">
                Amount
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isInvoicesLoaded &&
              invoices.invoices
                //.sort((a, b) => a.quoteDate.localeCompare(b.quoteDate))
                .map((invoice, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="left">
                      {getFormattedDateAndTime(invoice.quoteDate)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {invoice.client.lastname}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {invoice.techLead ? invoice.techLead : "none"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {toCurrency(invoice.totalQuote)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid
        container
        alignItems="flex-start"
        justifyContent="flex-end"
        direction="row"
      >
        <Button
          className={classes.spacing}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Add />}
        >
          Add New Invoice
        </Button>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  isInvoicesLoaded: selectIsInvoicesLoaded,
  invoices: selectInvoicesList,
});

export default connect(mapStateToProps)(GeneralLedgerPage);
