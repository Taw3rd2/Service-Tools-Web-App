import React from "react";
import { Grid } from "@material-ui/core";
import InvoiceWarranty from "./disclaimer/InvoiceWarranty";
import InvoiceTotals from "./totals/InvoiceTotals";

const WarrantyTotalsFrame = ({ data }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <InvoiceWarranty />
          </Grid>
          <Grid item xs={6}>
            <InvoiceTotals data={data} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default WarrantyTotalsFrame;
