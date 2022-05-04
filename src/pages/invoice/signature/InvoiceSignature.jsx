import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  border: {
    //border: "2px solid black",
    paddingLeft: "15px",
  },
  label: {
    color: "red",
    fontStyle: "italic",
    marginLeft: "10px",
  },
  item: {
    marginLeft: "10px",
  },
  topMargin: {
    marginTop: "15px",
  },
  signature: {
    marginTop: "30px",
  },
}));

const InvoiceSignature = ({ data }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.topMargin}>
      <Grid item xs={12}>
        <Typography variant="caption" className={classes.label}>
          Customer Signature
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.border}>
        <Grid container>
          <Grid item xs={12}>
            I have authority to order the work outlined above which has been
            satisfactorly completed. I agree that Seller retains title to
            equipment/material furnished until final payment has been made. If
            payment is not been made as agreed, Seller can remove said
            equipment/materials at Sellers expense. Any damage resulting from
            said removal shall not be the responsibility of the Seller.
          </Grid>
          <Grid item xs={12}>
            {data.signatureUrl === "" || data.signatureUrl === undefined ? (
              <div>
                <Typography variant="h5" className={classes.signature}>
                  {"X___________________________________________"}
                </Typography>
                {/* <label>
                  <img
                    src={blankSignature}
                    alt="empty signature"
                    style={{
                      width: "100%",
                      objectFit: "contain",
                      maxHeight: "60px",
                    }}
                  />
                </label> */}
              </div>
            ) : (
              <Typography variant="h5">X</Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InvoiceSignature;
