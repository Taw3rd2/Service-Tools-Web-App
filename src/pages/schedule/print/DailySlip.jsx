import React from "react";

import { getFormattedDate } from "../../../utils/dateUtils";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 55,
  },
  paper: {
    border: "1px solid black",
  },
  pr: {
    paddingRight: theme.spacing(1),
  },
  pl: {
    paddingLeft: theme.spacing(1),
  },
  plpr: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  p: {
    margin: 0,
    padding: 0,
    whiteSpace: "nowrap",
    wordWrap: "break-word",
    wordBreak: "break-word",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
}));

const DailySlip = (props) => {
  const matchesPrint = useMediaQuery("print");
  const classes = useStyles();

  return (
    <>
      <Grid item xs={6} className={classes.root}>
        <Paper style={{ height: 410 }} variant="outlined">
          <Grid container>
            <Grid item xs={4} className={classes.pl}>
              {/*Service Date*/}
              <TextField
                name="startDate"
                margin="dense"
                variant="outlined"
                label="Service Date"
                value={getFormattedDate(props.children[1].dateScheduled)}
                size="small"
                inputProps={{
                  style: { fontSize: 14 },
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={4} className={classes.plpr}>
              {/*Lead Source*/}
              <TextField
                name="leadSource"
                margin="dense"
                variant="outlined"
                label="Lead Source"
                value={props.children[1].leadSource}
                size="small"
                inputProps={{
                  style: { fontSize: 14 },
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={4} className={classes.pr}>
              {/*Call Taken By*/}
              <TextField
                name="takenBy"
                margin="dense"
                variant="outlined"
                label="Dispatcher"
                value={props.children[1].takenBy}
                size="small"
                inputProps={{
                  style: { fontSize: 14 },
                }}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container>
            {props.children[1].firstname ? (
              <>
                {matchesPrint ? (
                  <>
                    <Grid item xs={6} className={classes.pl}>
                      <p className={classes.p}>
                        {props.children[1].firstname}{" "}
                        {props.children[1].lastname}
                      </p>
                    </Grid>

                    <Grid item xs={6} className={classes.pr}>
                      {props.children[1].phoneName &&
                      props.children[1].phone ? (
                        <p className={classes.p}>
                          {`${props.children[1].phoneName}`}
                        </p>
                      ) : props.children[1].phoneName ? (
                        <p
                          className={classes.p}
                        >{`${props.children[1].phoneName}`}</p>
                      ) : null}
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={6} className={classes.pl}>
                      <Typography noWrap variant="body1">
                        {props.children[1].firstname}{" "}
                        {props.children[1].lastname}
                      </Typography>
                    </Grid>

                    <Grid item xs={6} className={classes.pr}>
                      {props.children[1].phoneName &&
                      props.children[1].phone ? (
                        <Typography noWrap variant="body1">
                          {`${props.children[1].phoneName}: ${props.children[1].phone}`}
                        </Typography>
                      ) : props.children[1].phoneName ? (
                        <Typography noWrap variant="body1">
                          {`${props.children[1].phoneName}`}
                        </Typography>
                      ) : props.children[1].phone ? (
                        <Typography noWrap variant="body1">
                          {`${props.children[1].phone}`}
                        </Typography>
                      ) : null}
                    </Grid>
                  </>
                )}
              </>
            ) : (
              <>
                {matchesPrint ? (
                  <>
                    <Grid item xs={6} className={classes.pl}>
                      <p className={classes.p}>{props.children[1].lastname}</p>
                    </Grid>

                    <Grid item xs={6} className={classes.pr}>
                      {props.children[1].phoneName && (
                        <p className={classes.p}>
                          {`${props.children[1].phoneName}`}
                        </p>
                      )}
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={6} className={classes.pl}>
                      <Typography noWrap variant="body1">
                        {props.children[1].lastname}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.pr}>
                      {props.children[1].phoneName &&
                      props.children[1].phone ? (
                        <Typography noWrap variant="body1">
                          {`${props.children[1].phoneName}: ${props.children[1].phone}`}
                        </Typography>
                      ) : props.children[1].phoneName ? (
                        <Typography noWrap variant="body1">
                          {`${props.children[1].phoneName}`}
                        </Typography>
                      ) : props.children[1].phone ? (
                        <Typography noWrap variant="body1">
                          {`${props.children[1].phone}`}
                        </Typography>
                      ) : null}
                    </Grid>
                  </>
                )}
              </>
            )}
            {matchesPrint ? (
              <>
                <Grid item xs={6} className={classes.pl}>
                  <p className={classes.p}>{props.children[1].street}</p>
                </Grid>
                <Grid item xs={6} className={classes.pr}>
                  {props.children[1].phone && (
                    <p className={classes.p}>{`${props.children[1].phone}`}</p>
                  )}
                </Grid>
                <Grid item xs={6} className={classes.pl}>
                  <p className={classes.p}>{props.children[1].city}</p>
                </Grid>
                <Grid item xs={6} className={classes.pr}>
                  {props.children[1].altPhoneName && (
                    <p className={classes.p}>
                      {`${props.children[1].altPhoneName}`}
                    </p>
                  )}
                </Grid>
                <Grid item xs={6} className={classes.pl} />
                <Grid item xs={6} className={classes.pr}>
                  {props.children[1].altphone && (
                    <p className={classes.p}>
                      {`${props.children[1].altphone}`}
                    </p>
                  )}
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={6} className={classes.pl}>
                  <Typography noWrap variant="body1">
                    {props.children[1].street}
                  </Typography>
                </Grid>
                <Grid item xs={6} className={classes.pr}>
                  {props.children[1].altPhoneName &&
                  props.children[1].altphone ? (
                    <Typography noWrap variant="body1">
                      {`${props.children[1].altPhoneName}: ${props.children[1].altphone}`}
                    </Typography>
                  ) : props.children[1].altPhoneName ? (
                    <Typography noWrap variant="body1">
                      {`${props.children[1].altPhoneName}`}
                    </Typography>
                  ) : props.children[1].altphone ? (
                    <Typography noWrap variant="body1">
                      {`${props.children[1].altphone}`}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item xs={6} className={classes.pl}>
                  <Typography noWrap variant="body1">
                    {props.children[1].city}
                  </Typography>
                </Grid>
                <Grid item xs={6} className={classes.pr} />
              </>
            )}
          </Grid>

          <Grid container>
            <Grid item xs={6} className={classes.pl}>
              {/*Work Selector*/}
              <TextField
                name="issueSelect"
                margin="dense"
                variant="outlined"
                label="Issue"
                value={props.children[1].issue}
                inputProps={{
                  style: { fontSize: 14 },
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} className={classes.pr}>
              {/*Slotted Time*/}
              <TextField
                name="timeAlotted"
                margin="dense"
                variant="outlined"
                label="Slotted Time"
                value={props.children[1].timeAlotted}
                inputProps={{
                  style: { fontSize: 14 },
                }}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4} className={classes.pl}>
              {/*Tech Lead*/}
              <TextField
                name="techLeadSelect"
                margin="dense"
                variant="outlined"
                label="Tech Lead"
                value={props.children[1].techLead}
                inputProps={{
                  style: { fontSize: 14 },
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={4} className={classes.plpr}>
              {/*Tech helper*/}
              <TextField
                name="techHelperSelect"
                margin="dense"
                variant="outlined"
                label="Tech Helper"
                value={props.children[1].techHelper}
                inputProps={{
                  style: { fontSize: 14 },
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={4} className={classes.pr}>
              {/*Payment*/}
              <TextField
                name="paymentSelect"
                margin="dense"
                variant="outlined"
                label="Payment"
                value={props.children[1].payment}
                inputProps={{
                  style: { fontSize: 14 },
                }}
                fullWidth
              />
            </Grid>
          </Grid>
          <div>
            {/*Notes textarea*/}
            <div className={classes.plpr}>
              <TextField
                name="notes"
                margin="dense"
                variant="outlined"
                label="Notes (4 lines max for printable view)"
                rowsMax="4"
                rows="4"
                fullWidth
                multiline
                value={props.children[1].notes}
              />
            </div>
          </div>
          <Grid container>
            <Grid item xs={4} className={classes.pl}>
              {/*Time Of Day*/}
              <TextField
                name="timeOfDay"
                margin="dense"
                variant="outlined"
                label="Requested"
                value={props.children[1].timeOfDay}
                inputProps={{
                  style: { fontSize: 14 },
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={4} className={classes.plpr}></Grid>
            <Grid item xs={4} className={classes.pr}>
              {/*Job Number*/}
              <TextField
                name="jobNumber"
                margin="dense"
                variant="outlined"
                label="Job Number"
                value={props.children[1].jobNumber}
                inputProps={{
                  style: { fontSize: 14 },
                }}
                fullWidth
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default DailySlip;
