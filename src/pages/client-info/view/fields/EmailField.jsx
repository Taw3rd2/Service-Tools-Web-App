import React from "react";

import { Card, Typography } from "@material-ui/core";
import { MailOutline } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fieldEntries: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 10,
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

const EmailField = ({ title, email }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Typography variant="caption">{title}</Typography>
      <div className={classes.cardRow}>
        <MailOutline color="primary" />
        <Typography variant="body1" className={classes.fieldEntries}>
          {email}
        </Typography>
      </div>
    </Card>
  );
};

export default EmailField;
