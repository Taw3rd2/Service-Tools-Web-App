import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
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

const EditWorkListItem = ({
  isEditWorkListItemModalOpen,
  closeEditWorkListItemModal,
  workListItem,
  updateWorkListStart,
}) => {
  const classes = useStyles();

  const [item, setItem] = useState(workListItem.item ? workListItem.item : "");
  const [shorthand, setShorthand] = useState(
    workListItem.shorthand ? workListItem.shorthand : ""
  );

  const onSubmit = (event) => {
    event.preventDefault();
    const updatedWorkListItem = {
      item,
      shorthand,
      id: workListItem.id,
    };
    console.log("Updated Work List Item: ", updatedWorkListItem);
    updateWorkListStart(updatedWorkListItem);
    closeEditWorkListItemModal();
  };

  return (
    <Modal
      aria-labelledby="edit-work-list-item-modal"
      aria-describedby="edit-work-list-item-modal-form"
      open={isEditWorkListItemModalOpen}
      onClose={closeEditWorkListItemModal}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isEditWorkListItemModalOpen}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom className={classes.text}>
            Edit
          </Typography>
          <form autoComplete="new password" onSubmit={onSubmit}>
            <TextField
              id="work_list_item_option"
              label="Work List Option"
              className={classes.textField}
              value={item}
              onChange={(e) => setItem(e.target.value)}
              margin="normal"
              required
              fullWidth
            />
            <TextField
              id="work_list_item_shorthand"
              label="Option Shorthand"
              className={classes.textField}
              value={shorthand}
              onChange={(e) => setShorthand(e.target.value)}
              margin="normal"
              required
              fullWidth
            />
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
                startIcon={<ArrowUpwardIcon />}
              >
                Submit
              </Button>
              <Button
                type="button"
                size="large"
                color="primary"
                variant="contained"
                className={classes.button}
                startIcon={<CloseIcon />}
                onClick={() => closeEditWorkListItemModal()}
              >
                Close
              </Button>
            </Grid>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default EditWorkListItem;
