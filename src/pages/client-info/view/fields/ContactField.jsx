import React from "react";

import { Card, Typography } from "@material-ui/core";
import { Person, PhoneOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fieldEntries: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 10,
    fontSize: "1.125rem",
  },

  fieldEntriesSpace: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 24,
    marginLeft: 10,
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
}));

const ContactField = ({ title, name, phone }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Typography variant="caption">{title}</Typography>
      <div className={classes.cardRow}>
        <Person color="primary" />
        {name ? (
          <Typography variant="body1" className={classes.fieldEntries}>
            {name}
          </Typography>
        ) : (
          <Typography variant="body1" className={classes.fieldEntries}>
            {"No Contact Name Entered"}
          </Typography>
        )}
      </div>

      <div className={classes.cardRow}>
        <PhoneOutlined className={classes.blackIcon} />
        {phone ? (
          <Typography variant="body1" className={classes.fieldEntries}>
            {phone}
          </Typography>
        ) : (
          <Typography variant="body1" className={classes.fieldEntries}>
            {"No Phone Number Entered"}
          </Typography>
        )}
      </div>

      <div className={classes.cardRow}>
        <Typography variant="body1" className={classes.fieldEntriesSpace}>
          {"  "}
        </Typography>
      </div>
    </Card>
  );
};

export default ContactField;
