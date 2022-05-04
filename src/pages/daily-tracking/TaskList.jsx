import React, { useState } from "react";

import {
  Card,
  CardContent,
  Checkbox,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";

import {
  AccessTime,
  Autorenew,
  BorderOuter,
  Build,
  Call,
  CreateNewFolder,
  ExpandLess,
  ExpandMore,
  FileCopy,
  ViewModule,
} from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  top: {
    marginTop: theme.spacing(2),
    overflow: "auto",
    maxHeight: "310px",
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const TaskList = () => {
  const classes = useStyles();

  const [openInstallPaperwork, setOpenInstallPaperwork] = useState(false);
  const [openNextServiceDay, setOpenNextServiceDay] = useState(false);
  const [openMaterialOrderTracking, setOpenMaterialOrderTracking] =
    useState(false);
  const [stockOrdersCheck, setStockordersCheck] = useState(false);

  const handleOpenInstallPaperwork = () => {
    setOpenInstallPaperwork(!openInstallPaperwork);
  };
  const handleOpenNextServiceDay = () => {
    setOpenNextServiceDay(!openNextServiceDay);
  };
  const handleOpenMaterialOrderTracking = () => {
    setOpenMaterialOrderTracking(!openMaterialOrderTracking);
  };
  const handleStockOrdersCheck = () => {
    setStockordersCheck(!stockOrdersCheck);
  };

  return (
    <Card variant="outlined" className={classes.top}>
      <CardContent>
        <List
          dense
          component="nav"
          aria-labelledby="nested-todo-list"
          subheader={
            <ListSubheader component="div" id="nested-todo-list">
              Automated Task List
            </ListSubheader>
          }
        >
          <ListItem button onClick={handleOpenMaterialOrderTracking}>
            <ListItemIcon>
              <AccessTime style={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Material Order Tracking" />
            {openMaterialOrderTracking ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openMaterialOrderTracking} timeout="auto" unmountOnExit>
            <List dense component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={handleStockOrdersCheck}
              >
                <ListItemIcon>
                  <ViewModule style={{ color: "brown" }} />
                </ListItemIcon>
                <ListItemText primary="Stock Orders" />
                <Checkbox
                  edge="start"
                  checked={stockOrdersCheck}
                  tabIndex={-1}
                  disableRipple
                  //inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItem>

              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <ViewModule style={{ color: "brown" }} />
                </ListItemIcon>
                <ListItemText primary="Part Orders" />
              </ListItem>

              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <ViewModule style={{ color: "brown" }} />
                </ListItemIcon>
                <ListItemText primary="Maintenance Orders" />
              </ListItem>

              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <ViewModule style={{ color: "brown" }} />
                </ListItemIcon>
                <ListItemText primary="Commercial HT Orders" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={handleOpenInstallPaperwork}>
            <ListItemIcon>
              <Build style={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Furnace Install Paperwork" />
            {openInstallPaperwork ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openInstallPaperwork} timeout="auto" unmountOnExit>
            <List dense component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <CreateNewFolder style={{ color: "tan" }} />
                </ListItemIcon>
                <ListItemText primary="Invoice" />
              </ListItem>

              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <CreateNewFolder style={{ color: "tan" }} />
                </ListItemIcon>
                <ListItemText primary="Permit" />
              </ListItem>

              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <FileCopy />
                </ListItemIcon>
                <ListItemText primary="Copies" />
              </ListItem>

              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <CreateNewFolder style={{ color: "tan" }} />
                </ListItemIcon>
                <ListItemText primary="Startup Invoice" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={handleOpenNextServiceDay}>
            <ListItemIcon>
              <Autorenew style={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary="Next Service Day" />
            {openNextServiceDay ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openNextServiceDay} timeout="auto" unmountOnExit>
            <List dense component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <Call style={{ color: "blue" }} />
                </ListItemIcon>
                <ListItemText primary="Appointment Confirmation" />
              </ListItem>

              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <BorderOuter style={{ color: "brown" }} />
                </ListItemIcon>
                <ListItemText primary="Pull Material" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </CardContent>
    </Card>
  );
};

export default TaskList;
