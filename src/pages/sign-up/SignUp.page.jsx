import React, { useState } from "react";
import { connect } from "react-redux";
import { signUpStart } from "../../redux/user/user.actions";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

import "./SignUp.styles.css";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "20vw",
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const SignUp = ({ signUpStart }) => {
  const classes = useStyles();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match!");
      return;
    }
    signUpStart({ displayName, email, password });
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <h2>Sign Up With Email</h2>
        <span>Create a new account here</span>
        <form
          onSubmit={handleSubmit}
          className={classes.form}
          autoComplete="new password"
        >
          <TextField
            label="First And Last Name"
            type="text"
            name="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            value="Submit Form"
          >
            Create New Account
          </Button>
        </form>
      </Card>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
