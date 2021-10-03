import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";

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

const SignIn = ({ googleSignInStart, emailSignInStart }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    emailSignInStart(email, password);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <h2>Sign In With Gmail</h2>
        <span>Sign in with email and password</span>
        <form
          onSubmit={handleSubmit}
          className={classes.form}
          noValidate
          autoComplete="new password"
        >
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
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            value="Submit Form"
          >
            Log In With Email
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="button"
            onClick={googleSignInStart}
          >
            Google Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
