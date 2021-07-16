import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  table: {
    minWidth: 500,
    border: "1px solid black",
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
}));

const BasicTableList = ({
  tableHead,
  tableBody,
  height,
  additionalButtons,
}) => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.root}>
      <TableContainer
        component={Paper}
        style={{ overflow: "auto", height: height }}
      >
        <Table
          stickyHeader
          className={classes.table}
          size="small"
          aria-label="inventory table"
        >
          <TableHead>
            <TableRow>{tableHead}</TableRow>
          </TableHead>
          <TableBody>{tableBody}</TableBody>
        </Table>
      </TableContainer>
      <Grid
        container
        alignItems="flex-start"
        justifyContent="flex-end"
        direction="row"
      >
        {additionalButtons}
      </Grid>
    </Paper>
  );
};

export default BasicTableList;
