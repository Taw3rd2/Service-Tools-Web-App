import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
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

const Dispatches = ({
  isDispatchesModalOpen,
  closeDispatchesModal,
  openSelectedDispatchModal,
  client,
}) => {
  const classes = useStyles();

  const [dispatches, setDispatches] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("events")
      .where("lastname", "==", `${client.lastname}`)
      .onSnapshot(
        (snapshot) => {
          const newDispatches = [];
          snapshot.forEach((doc) => {
            let dispatch = doc.data();
            dispatch.id = doc.id;
            dispatch.dateCreated = dispatch.dateCreated.toDate();
            dispatch.dateScheduled = dispatch.dateScheduled.toDate();
            dispatch.dateModified = dispatch.dateModified.toDate();
            dispatch.start = dispatch.start.toDate();
            dispatch.end = dispatch.end.toDate();
            newDispatches.push(dispatch);
          });
          setDispatches(newDispatches);
        },
        (error) => {
          console.log(error.message);
        }
      );
    return () => unsubscribe();
  }, [client.lastname]);

  return (
    <Modal
      aria-labelledby="equipment-list-modal"
      aria-describedby="equipment-list-modal-form"
      open={isDispatchesModalOpen}
      onClose={closeDispatchesModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isDispatchesModalOpen}>
        <Card className={classes.root}>
          <CardHeader title="Dispatches" className={classes.teal} />
          <CardContent className={classes.content}>
            {dispatches
              .sort((a, b) => b.scheduledDate - a.scheduledDate)
              .map((item, index) => {
                return (
                  <Paper
                    key={item.id}
                    elevation={3}
                    className={classes.paper}
                    onClick={() => openSelectedDispatchModal(item)}
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
                          {getFormattedDate(item.dateScheduled)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={6}>
                        <Typography color="textSecondary">
                          <strong className={classes.teal}>Issue:</strong>{" "}
                          {item.issue}
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
                          <strong className={classes.teal}>Tech Lead:</strong>{" "}
                          {item.techLead}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          <strong className={classes.teal}>
                            Tech's Assisting:
                          </strong>{" "}
                          {item.techHelper}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>
                          <strong className={classes.teal}>Notes:</strong>{" "}
                          {item.notes}
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
              onClick={() => closeDispatchesModal()}
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

export default Dispatches;
