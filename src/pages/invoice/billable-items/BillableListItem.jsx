import React, { useEffect, useState } from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  toControlledMarkUp,
  toControlledMarkUpTotal,
} from "../../../utils/currencyUtils";

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

const BillableListItem = ({ data }) => {
  const classes = useStyles();

  const [billableItems, setBillableItems] = useState([]);

  useEffect(() => {
    setBillableItems(data.partsList);
  }, [data.partsList]);

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
                Price
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="caption" className={classes.label}>
                Total
              </Typography>
            </Grid>
          </Grid>
          {billableItems &&
            billableItems.map((part, index) => (
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
                    {toControlledMarkUp(part.cost, part.markUp)}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1" className={classes.item}>
                    {toControlledMarkUpTotal(
                      part.partCost,
                      part.partMarkUp,
                      part.quantity
                    )}
                  </Typography>
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </>
  );
};

export default BillableListItem;
