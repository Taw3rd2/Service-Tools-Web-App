import React from "react";

import { Grid, Typography } from "@material-ui/core";
import heartImage from "../../../utils/images/red-scratched-heart.jpg";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  imageStyles: {
    objectFit: "contain",
    maxHeight: "40px",
  },
  italicsWithTopPadding: {
    fontStyle: "italic",
    paddingTop: "20px",
  },
  italicsWthRightPadding: {
    fontStyle: "italic",
    paddingRight: "10px",
  },
  topPadding: {
    paddingTop: "7px",
  },
  redText: {
    color: "red",
  },
}));

const InvoiceNumber = ({ data }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid container item xs={12} justifyContent="center">
        <Typography variant="h5" className={classes.italicsWithTopPadding}>
          Your Hometown Heating Company
        </Typography>
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Typography variant="h5" className={classes.italicsWthRightPadding}>
          With A
        </Typography>
        <img
          src={heartImage}
          alt="heartImage"
          className={classes.imageStyles}
        />
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        {data.client && data.client.iscommercial ? (
          <Typography variant="h6" className={classes.topPadding}>
            Commercial
          </Typography>
        ) : (
          <Typography variant="h6" className={classes.topPadding}>
            Residential
          </Typography>
        )}
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Typography variant="h6">Service Invoice</Typography>
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Typography variant="h4" className={classes.redText}>
          {data.invoiceNumberPrefix}
          {data.userCreatedInvoiceNumber}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default InvoiceNumber;
