import React, { useEffect, useState } from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { toCurrency } from "../../../utils/currencyUtils";

const useStyles = makeStyles(() => ({
  border: {
    //border: "2px solid black",
    paddingLeft: "10px",
  },
  label: {
    fontStyle: "italic",
    marginLeft: "10px",
  },
  item: {
    marginLeft: "10px",
  },
}));

const QuotedListItems = ({ data }) => {
  const classes = useStyles();

  const [quoteData, setQuoteData] = useState({});

  useEffect(() => {
    setQuoteData(data);
  }, [data]);

  console.log("QuotedListItems: ", quoteData);

  return (
    <>
      <Grid container className={classes.border}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <Typography variant="caption" className={classes.label}>
                Qty
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="caption" className={classes.label}>
                Description
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="caption" className={classes.label}>
                Total
              </Typography>
            </Grid>
          </Grid>

          {data &&
            data.partsList.map((part, index) => (
              <Grid container spacing={2} key={index}>
                <Grid container item xs={1} justifyContent="center">
                  <Typography variant="body1" className={classes.item}>
                    {part.quantity}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body1" className={classes.item}>
                    {part.partDescription}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1" className={classes.item}>
                    {""}
                  </Typography>
                </Grid>
              </Grid>
            ))}

          {data.rediagnostic && (
            <Grid container spacing={2}>
              <Grid container item xs={1} justifyContent="center">
                <Typography variant="body1" className={classes.item}>
                  1
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body1" className={classes.item}>
                  Rediagnostic
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1" className={classes.item}>
                  {""}
                </Typography>
              </Grid>
            </Grid>
          )}

          {data.maintenance && (
            <Grid container spacing={2}>
              <Grid container item xs={1} justifyContent="center">
                <Typography variant="body1" className={classes.item}>
                  1
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body1" className={classes.item}>
                  Standard Maintenance
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1" className={classes.item}>
                  {""}
                </Typography>
              </Grid>
            </Grid>
          )}

          <Grid container spacing={2}>
            <Grid container item xs={1} justifyContent="center">
              <Typography variant="body1" className={classes.item}>
                {""}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="body1" className={classes.item}>
                Pre Defined Quote (Parts and labor included)
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" className={classes.item}>
                {toCurrency(data.subTotalOfInvoice)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default QuotedListItems;
