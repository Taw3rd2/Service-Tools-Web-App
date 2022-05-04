import React, { useState } from "react";

import {
  Avatar,
  Card,
  CardContent,
  Checkbox,
  List,
  ListSubheader,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";

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
}));

const ExpiringMaintenance = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState([
    {
      name: "Alyssa Austin",
      expiration: "4/04/2022",
    },
    {
      name: "James Cohoon",
      expiration: "4/15/2022",
    },
    {
      name: "Thomas Waldorf",
      expiration: "4/19/2022",
    },
    {
      name: "Nick Jackson",
      expiration: "4/22/2022",
    },
    {
      name: "Cheryl Keefover",
      expiration: "4/25/2022",
    },
    {
      name: "Tracy Holifield",
      expiration: "4/27/2022",
    },
  ]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Card variant="outlined" className={classes.top}>
      <CardContent>
        <List
          dense
          className={classes.root}
          aria-labelledby="expiring-maintenance-list"
          subheader={
            <ListSubheader component="div" id="expiring-maintenance-list">
              This Months Expiring Maintenance
            </ListSubheader>
          }
        >
          {checked.map((value) => {
            console.log("value: ", value);
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <ListItem key={value} button>
                <ListItemAvatar>
                  <Avatar alt={`Avatar n°${value + 1}`} src={``} />
                </ListItemAvatar>
                <ListItemText
                  id={labelId}
                  primary={`${value.name}`}
                  secondary={`Expiration Date: ${value.expiration}`}
                />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(value)}
                    checked={checked.indexOf(value) !== -1}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};

export default ExpiringMaintenance;
