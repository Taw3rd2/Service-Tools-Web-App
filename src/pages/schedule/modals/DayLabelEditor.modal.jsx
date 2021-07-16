import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { isEqual } from "date-fns";
import { getFormattedDate } from "../../../utils/dateUtils";

import {
  selectIsLabelsLoaded,
  selectLabelList,
} from "../../../redux/labels/label.selectors";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 20,
  },
  body: {
    fontSize: 20,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  table: {
    minWidth: 500,
    border: "1px solid black",
  },
  spacing: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
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
    color: "teal",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const DayLabelEditor = ({
  isDayLabelEditorModalOpen,
  closeDayLabelEditor,
  labels,
  isLabelsLoaded,
  dateSelected,
  openAddDayLabelModal,
  openEditDayLabelModal,
  openDeleteDayLabelModal,
}) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="day-label-editor-modal"
      aria-describedby="day-label-editor"
      open={isDayLabelEditorModalOpen}
      onClose={closeDayLabelEditor}
      className={classes.modal}
      closeAfterTransition
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isDayLabelEditorModalOpen}>
        <Paper variant="outlined" className={classes.root}>
          <Typography variant="h5" gutterBottom className={classes.text}>
            Day Label Editor for {getFormattedDate(dateSelected)}
          </Typography>
          <TableContainer
            component={Paper}
            style={{ overflow: "auto", height: "380px" }}
          >
            <Table
              stickyHeader
              className={classes.table}
              size="medium"
              aria-label="set day labels table"
            >
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell
                    component="th"
                    align="left"
                    style={{ backgroundColor: "white", color: "teal" }}
                  >
                    #
                  </StyledTableCell>
                  <StyledTableCell
                    component="th"
                    align="left"
                    style={{ backgroundColor: "white", color: "teal" }}
                  >
                    Technician
                  </StyledTableCell>
                  <StyledTableCell
                    component="th"
                    align="left"
                    style={{ backgroundColor: "white", color: "teal" }}
                  >
                    Label
                  </StyledTableCell>
                  <StyledTableCell
                    component="th"
                    align="left"
                    style={{ backgroundColor: "white", color: "teal" }}
                  >
                    Edit
                  </StyledTableCell>
                  <StyledTableCell
                    component="th"
                    align="left"
                    style={{ backgroundColor: "white", color: "teal" }}
                  >
                    Delete
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {isLabelsLoaded &&
                  labels.labels
                    .filter((item) => isEqual(item.labelDate, dateSelected))
                    .sort((a, b) => a.tech.localeCompare(b.tech))
                    .map((technician, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell style={{ width: 25 }} align="left">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {technician.tech}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {technician.locationName}
                        </StyledTableCell>
                        <StyledTableCell style={{ width: 100 }} align="center">
                          <Button
                            color="primary"
                            variant="outlined"
                            startIcon={<EditIcon />}
                            onClick={() => openEditDayLabelModal(technician)}
                          >
                            Edit
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell style={{ width: 100 }} align="center">
                          <Button
                            color="primary"
                            variant="outlined"
                            startIcon={<ClearIcon />}
                            onClick={() => openDeleteDayLabelModal(technician)}
                          >
                            Delete
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid
            container
            alignItems="flex-start"
            justify="flex-end"
            direction="row"
          >
            <Button
              className={classes.spacing}
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AddIcon />}
              onClick={() => openAddDayLabelModal()}
            >
              Add New Label
            </Button>
            <Button
              className={classes.spacing}
              type="button"
              size="large"
              color="primary"
              variant="contained"
              startIcon={<CloseIcon />}
              onClick={() => closeDayLabelEditor()}
            >
              Close
            </Button>
          </Grid>
        </Paper>
      </Fade>
    </Modal>
  );
};

const mapStateToProps = createStructuredSelector({
  isLabelsLoaded: selectIsLabelsLoaded,
  labels: selectLabelList,
});

export default connect(mapStateToProps)(DayLabelEditor);
