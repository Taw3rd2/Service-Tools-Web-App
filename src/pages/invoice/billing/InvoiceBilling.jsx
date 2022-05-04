import React, { useState } from "react";

import {
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { makeStyles, withStyles } from "@material-ui/styles";
import CashPayment from "./CashPayment";
import CheckPayment from "./CheckPayment";
import CardPayment from "./CardPayment";
import NetThirtyPayment from "./NetThirtyPayment";
import { toCurrency } from "../../../utils/currencyUtils";

const useStyles = makeStyles((theme) => ({
  main: {
    paddingLeft: "10px",
  },
  label: {
    color: "red",
    fontStyle: "italic",
    paddingLeft: "15px",
  },
  root: {
    flexGrow: 1,
    paddingLeft: "15px",
  },
  topMargin: {
    marginTop: "15px",
  },
}));

const BlueCheckbox = withStyles({
  root: {
    color: blue[400],
    "&$checked": {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const InvoiceBilling = ({ data }) => {
  const classes = useStyles();

  const [useCash, setUseCash] = useState(
    data.halfDown.type === "cash" || data.balanceDue.type === "cash"
      ? true
      : false
  );
  const [useCheck, setUseCheck] = useState(
    data.halfDown.type === "check" || data.balanceDue.type === "check"
      ? true
      : false
  );
  const [useCard, setUseCard] = useState(
    data.halfDown.type === "card" || data.balanceDue.type === "card"
      ? true
      : false
  );
  const [useNetThirty, setUseNetThirty] = useState(
    data.halfDown.type === "netThirty" || data.balanceDue.type === "netThirty"
      ? true
      : false
  );

  return (
    <Grid container className={classes.topMargin}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Typography variant="caption" className={classes.label}>
              Billing
            </Typography>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6} className={classes.main}>
            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12}>
                <Grid item>
                  <Typography variant="body1">
                    {`Total Invoice: ${toCurrency(data.totalQuote)}`}
                  </Typography>
                </Grid>
                {data.isPreDefinedQuote && (
                  <>
                    <Grid item>
                      {data.halfDown && (
                        <Typography variant="body1">
                          {`Half Down: ${toCurrency(data.halfDown.amount)}`}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item>
                      {data.balanceDue && (
                        <Typography variant="body1">
                          {`Balance Due: ${toCurrency(data.balanceDue.amount)}`}
                        </Typography>
                      )}
                    </Grid>
                  </>
                )}
                <Grid container justifyContent="flex-start" spacing={2}>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <BlueCheckbox
                          checked={useCash}
                          onChange={(e) => setUseCash(e.target.checked)}
                          name="cashCheck"
                        />
                      }
                      label="Cash"
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <BlueCheckbox
                          checked={useCheck}
                          onChange={(e) => setUseCheck(e.target.checked)}
                          name="checkCheck"
                        />
                      }
                      label="Check"
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <BlueCheckbox
                          checked={useCard}
                          onChange={(e) => setUseCard(e.target.checked)}
                          name="cardCheck"
                        />
                      }
                      label="Card"
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <BlueCheckbox
                          checked={useNetThirty}
                          onChange={(e) => setUseNetThirty(e.target.checked)}
                          name="netThirtyCheck"
                        />
                      }
                      label="Net 30"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {useCash && <CashPayment data={data} />}
            {useCheck && <CheckPayment data={data} />}
            {useCard && <CardPayment data={data} />}
            {useNetThirty && <NetThirtyPayment data={data} />}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InvoiceBilling;
