import React from "react";

import { getFormattedDate } from "../../../utils/dateUtils";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectIsTechniciansLoaded,
  selectTechnicianList,
} from "../../../redux/technicians/technician.selectors";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    width: 500,
  },
  text: {
    color: "teal",
  },
  button: {
    marginTop: theme.spacing(1),
  },
  closeButton: {
    marginTop: theme.spacing(2),
  },
}));

const DailyOptions = ({
  isDailyOptionsModalOpen,
  closeDailyOptionsModal,
  dateSelected,
  openDayLabelEditorModal,
  technicians,
  isTechniciansLoaded,
}) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="daily-options-modal"
      aria-describedby="daily-options-modal-view"
      open={isDailyOptionsModalOpen}
      onClose={closeDailyOptionsModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isDailyOptionsModalOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.text}>
            Choose Options For {getFormattedDate(dateSelected)}
          </Typography>
          {isTechniciansLoaded &&
            technicians.technicians
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((tech) => (
                <Link
                  key={tech.id}
                  to={{
                    pathname: "/PrintDailySlips",
                    state: {
                      techLead: `${tech.name}`,
                      date: dateSelected,
                    },
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="contained"
                    className={classes.button}
                    fullWidth
                    style={{ backgroundColor: tech.color, color: "white" }}
                  >
                    {`Print ${tech.name}'s Daily Service`}
                  </Button>
                </Link>
              ))}
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            fullWidth
            onClick={() => openDayLabelEditorModal()}
          >
            Day Label Editor
          </Button>

          <Grid
            container
            alignItems="flex-start"
            justify="flex-end"
            direction="row"
          >
            <Button
              type="button"
              size="large"
              color="primary"
              variant="contained"
              startIcon={<CloseIcon />}
              className={classes.closeButton}
              onClick={() => closeDailyOptionsModal()}
            >
              Close
            </Button>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

const mapStateToProps = createStructuredSelector({
  isTechniciansLoaded: selectIsTechniciansLoaded,
  technicians: selectTechnicianList,
});

export default connect(mapStateToProps)(DailyOptions);
