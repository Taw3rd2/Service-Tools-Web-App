import React, { useState, useEffect } from "react";
import firebase from "firebase/app";

import { useHistory } from "react-router-dom";

import { getFormattedDate } from "../../../utils/dateUtils";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    width: "40%",
    maxHeight: 750,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    height: 550,
    overflow: "auto",
    border: "1px solid black",
  },
  paper: {
    cursor: "pointer",
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    marginTop: theme.spacing(2),
    margin: theme.spacing(1),
  },
  blue: {
    color: "blue",
  },
  teal: {
    color: "teal",
  },
}));

const PartsQuotes = ({
  isPartsQuotesModalOpen,
  closePartsQuotesModal,
  client,
}) => {
  const history = useHistory();

  const classes = useStyles();

  const [partsQuotes, setPartsQuotes] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("customers")
      .doc(`${client.id}`)
      .collection("partsQuotes")
      .onSnapshot(
        (snapshot) => {
          const newQuotes = [];
          snapshot.forEach((doc) => {
            let quote = doc.data();
            quote.id = doc.id;
            quote.quoteDate = quote.quoteDate.toDate();
            newQuotes.push(quote);
          });
          setPartsQuotes(newQuotes);
        },
        (error) => {
          console.log(error.message);
        }
      );
    return () => unsubscribe();
  }, [client.id]);

  const onSelectQuote = (quote) => {
    history.push({
      pathname: "PartsQuote",
      state: {
        selectedEquipment: {
          equipmentBrand: quote.equipmentBrand,
          equipmentModel: quote.equipmentModel,
          equipmentName: quote.equipmentName,
          equipmentSerial: quote.equipmentSerial,
        },
        client: client,
        quoteData: quote,
      },
    });
  };

  return (
    <Modal
      aria-labelledby="equipment-list-modal"
      aria-describedby="equipment-list-modal-form"
      open={isPartsQuotesModalOpen}
      onClose={closePartsQuotesModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isPartsQuotesModalOpen}>
        <Card className={classes.root}>
          <CardHeader title="Parts Quotes" className={classes.teal} />
          <CardContent className={classes.content}>
            {partsQuotes
              .sort((a, b) => b.quoteDate - a.quoteDate)
              .map((item, index) => {
                return (
                  <Paper
                    key={item.id}
                    elevation={3}
                    className={classes.paper}
                    onClick={() => onSelectQuote(item)}
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography
                          variant="h5"
                          component="h2"
                          color="textSecondary"
                          gutterBottom
                          className={classes.blue}
                        >
                          {getFormattedDate(item.quoteDate)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={6}>
                        <Typography color="textSecondary">
                          <strong className={classes.teal}>
                            Equipment Name:
                          </strong>{" "}
                          {item.equipmentName}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          <strong className={classes.teal}>Job Number:</strong>{" "}
                          {item.jobNumber}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="textSecondary">
                          <strong className={classes.teal}>Quote ID:</strong>{" "}
                          {item.id}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={12}>
                        <Typography>
                          <strong className={classes.teal}>
                            Shipping Notes:
                          </strong>{" "}
                          {item.shippingNotes}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                );
              })}
          </CardContent>

          <Grid
            container
            alignItems="flex-start"
            justify="flex-end"
            direction="row"
          >
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              tabIndex="21"
              onClick={() => closePartsQuotesModal()}
              startIcon={<CloseIcon />}
            >
              Close
            </Button>
          </Grid>
        </Card>
      </Fade>
    </Modal>
  );
};

export default PartsQuotes;
