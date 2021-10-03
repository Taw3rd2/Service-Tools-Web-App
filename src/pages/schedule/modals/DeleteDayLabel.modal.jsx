import React from "react";

import { connect } from "react-redux";
import { deleteLabelStart } from "../../../redux/labels/label.actions";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
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
  },
  text: {
    marginLeft: theme.spacing(1),
    color: "teal",
  },
  textField: {
    paddingTop: "3px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
  redButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    backgroundColor: "red",
  },
}));

const DeleteDayLabel = ({
  isDeleteDayLabelModalOpen,
  closeDeleteDayLabelModal,
  deleteLabelStart,
  dayLabel,
  deleteDayLabelSuccessIndicator,
}) => {
  const classes = useStyles();

  const removeDayLabel = () => {
    console.log("the label: ", dayLabel);
    deleteLabelStart(dayLabel);
    deleteDayLabelSuccessIndicator();
    closeDeleteDayLabelModal();
  };

  return (
    <Modal
      aria-labelledby="delete-day-label-modal"
      aria-describedby="delete-day-label-modal-form"
      open={isDeleteDayLabelModalOpen}
      onClose={closeDeleteDayLabelModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isDeleteDayLabelModalOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.text}>
            {`Delete ${dayLabel.locationName}?`}
          </Typography>

          <Grid
            container
            alignItems="flex-start"
            justify="flex-end"
            direction="row"
          >
            <Button
              type="submit"
              size="large"
              color="primary"
              variant="contained"
              className={classes.redButton}
              startIcon={<DeleteIcon />}
              onClick={() => removeDayLabel()}
            >
              Delete
            </Button>
            <Button
              size="large"
              color="primary"
              variant="contained"
              className={classes.button}
              startIcon={<CloseIcon />}
              onClick={() => closeDeleteDayLabelModal()}
            >
              Close
            </Button>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteLabelStart: (label) => dispatch(deleteLabelStart(label)),
});

export default connect(null, mapDispatchToProps)(DeleteDayLabel);
