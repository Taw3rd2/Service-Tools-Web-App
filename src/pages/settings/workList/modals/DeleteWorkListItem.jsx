import React from "react";
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
    padding: theme.spacing(2, 4, 3),
  },
  text: {
    marginLeft: theme.spacing(1),
  },
  textField: {
    paddingTop: "3px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const DeleteWorkListItem = ({
  isDeleteWorkListItemModalOpen,
  closeDeleteWorkListItemModal,
  removeWorkListItem,
  workListItem,
}) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="delete-work-list-modal"
      aria-describedby="delete-work-list-modal-form"
      open={isDeleteWorkListItemModalOpen}
      onClose={closeDeleteWorkListItemModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isDeleteWorkListItemModalOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.text}>
            {`Delete ${workListItem.item}?`}
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
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={() => removeWorkListItem(workListItem)}
            >
              Delete
            </Button>
            <Button
              size="large"
              color="primary"
              variant="contained"
              className={classes.button}
              startIcon={<CloseIcon />}
              onClick={() => closeDeleteWorkListItemModal()}
            >
              Close
            </Button>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

export default DeleteWorkListItem;
