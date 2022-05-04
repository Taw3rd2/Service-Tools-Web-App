import React from "react";

import { Card, Typography } from "@material-ui/core";
import { Business, Person, LocationOn } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: "1px solid black",
  },

  fieldEntries: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 10,
    fontSize: "1.125rem",
  },

  addressFieldEntries: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 34,
    fontSize: "1.125rem",
  },
  card: {
    padding: "8px",
  },
  cardRow: {
    display: "flex",
  },

  blackIcon: {
    color: "black",
  },

  redIcon: {
    color: "red",
  },
}));

const MainField = ({ title, name, address, address2, business }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      {business ? (
        <>
          <Typography variant="caption">{title}</Typography>
          <div className={classes.cardRow}>
            <Business color="primary" />
            <Typography variant="body1" className={classes.fieldEntries}>
              {name}
            </Typography>
          </div>
        </>
      ) : (
        <>
          <Typography
            variant="caption"
            gutterBottom
            className={classes.captions}
          >
            Customer Information
          </Typography>
          <div className={classes.cardRow}>
            <Person color="primary" />
            <Typography variant="body1" className={classes.fieldEntries}>
              {name}
            </Typography>
          </div>
        </>
      )}

      <div className={classes.cardRow}>
        <LocationOn className={classes.redIcon} />
        <Typography variant="body1" className={classes.fieldEntries}>
          {address}
        </Typography>
      </div>

      <div>
        <Typography variant="body1" className={classes.addressFieldEntries}>
          {address2}
        </Typography>
      </div>
    </Card>
  );
};

export default MainField;
