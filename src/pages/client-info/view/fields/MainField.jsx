import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import BusinessIcon from "@material-ui/icons/Business";
import PersonIcon from "@material-ui/icons/Person";
import LocationOnIcon from "@material-ui/icons/LocationOn";
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
    marginTop: 5,
  },

  cardContent: {
    paddingTop: 0,
    paddingBottom: 16,
  },

  captions: {
    marginLeft: 5,
    marginBottom: 5,
    marginTop: 5,
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
      <CardContent className={classes.cardContent}>
        {business ? (
          <>
            <Typography
              variant="caption"
              gutterBottom
              className={classes.captions}
            >
              {title}
            </Typography>
            <div className={classes.cardRow}>
              <BusinessIcon color="primary" />
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
              <PersonIcon color="primary" />
              <Typography variant="body1" className={classes.fieldEntries}>
                {name}
              </Typography>
            </div>
          </>
        )}

        <div className={classes.cardRow}>
          <LocationOnIcon className={classes.redIcon} />
          <Typography variant="body1" className={classes.fieldEntries}>
            {address}
          </Typography>
        </div>

        <div>
          <Typography variant="body1" className={classes.addressFieldEntries}>
            {address2}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default MainField;
