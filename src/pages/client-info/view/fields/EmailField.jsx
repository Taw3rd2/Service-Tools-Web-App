import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
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
}));

const EmailField = ({ title, email }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="caption" gutterBottom className={classes.captions}>
          {title}
        </Typography>
        <div className={classes.cardRow}>
          <MailOutlineIcon color="primary" />
          <Typography variant="body1" className={classes.fieldEntries}>
            {email}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailField;
