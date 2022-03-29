import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { signOutStart } from "../../redux/user/user.actions";

import { alpha, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  link: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    color: "white",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  blank: {
    flexGrow: 1,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  title: {
    marginRight: theme.spacing(2),
  },
}));

const NavBar = ({ currentUser, signOutStart }) => {
  let history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleCloseBlankFormMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box displayPrint="none" className={classes.root}>
      <AppBar position="static">
        {currentUser ? (
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
              Service Tools
            </Typography>
            <Typography>
              <Link
                className={classes.link}
                href="/"
                onClick={() => history.push("/")}
                color="inherit"
              >
                Customers
              </Link>
              <Link
                className={classes.link}
                href="/schedule"
                onClick={() => history.push("/schedule")}
                color="inherit"
              >
                Schedule
              </Link>
              <Link
                className={classes.link}
                href="/PartsCatalog"
                onClick={() => history.push("/PartsCatalog")}
                color="inherit"
              >
                Inventory
              </Link>
              <Link
                className={classes.link}
                href="/accounting"
                onClick={() => history.push("/accounting")}
                color="inherit"
              >
                Accounting
              </Link>
              <Link
                className={classes.link}
                href="/settings"
                onClick={() => history.push("/settings")}
                color="inherit"
              >
                Settings
              </Link>
            </Typography>
            <div className={classes.blank} />
            <Typography className={classes.link}>
              {currentUser.email}
            </Typography>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseBlankFormMenu}
            >
              <MenuItem onClick={handleCloseBlankFormMenu}>
                Blank Proposal
              </MenuItem>
              <MenuItem onClick={handleCloseBlankFormMenu}>
                Blank Material Req
              </MenuItem>
            </Menu>
            <Link
              href="/signin"
              className={classes.link}
              onClick={signOutStart}
            >
              Log Out
            </Link>
          </Toolbar>
        ) : (
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
              Service Tools
            </Typography>
            <Button color="inherit" onClick={() => history.push("/signin")}>
              Log In
            </Button>
          </Toolbar>
        )}
      </AppBar>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
