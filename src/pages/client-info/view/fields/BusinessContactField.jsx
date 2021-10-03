import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
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

const BusinessContactField = ({ title, name, phone, email }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="caption" gutterBottom className={classes.captions}>
          {title}
        </Typography>
        <div className={classes.cardRow}>
          <PersonIcon color="primary" />
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
          <PhoneOutlinedIcon className={classes.blackIcon} />

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

        {email ? (
          <div className={classes.cardRow}>
            <MailOutlineIcon color="primary" />
            <Typography variant="body1" className={classes.fieldEntries}>
              {email}
            </Typography>
          </div>
        ) : (
          <div className={classes.cardRow}>
            <MailOutlineIcon color="primary" />
            <Typography variant="body1" className={classes.fieldEntries}>
              {"No Email Entered"}
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessContactField;
