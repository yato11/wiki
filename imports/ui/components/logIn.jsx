import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import _ from "lodash";
import { Meteor } from "meteor/meteor";
import { useHistory } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"All Copyrights © Reserved For Me I Swear!"}
      <Link color="inherit" href="#For The King">
        #For The King
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LogIn(props) {
  let history = useHistory();
  const classes = useStyles();
  const { register, handleSubmit, errors, setValue } = useForm();
  const onSubmit = (data) => {
    Meteor.loginWithPassword(data.username, data.password, (err) => {
      setServerError(err);
      err && console.log("Login callback ", err);
      if (!err) {
        window.location = "/home";
      }
    });
  };
  const [serverError, setServerError] = useState("");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoFocus
            inputRef={register({
              required: `Please enter your username.`,
            })}
            helperText={errors && errors.username ? errors.username.type : " "}
            error={_.get(errors, "username") ? true : false}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={
              (serverError && "Invalid username / password !") ||
              (errors && errors.password ? errors.password.type : " ")
            }
            inputRef={register({ required: `Please enter password.` })}
            error={_.get(errors, "password") ? true : false}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2"></Link>
            </Grid>
            <Grid item>
              <Link
                variant="body2"
                href=""
                onClick={() => {
                  event.preventDefault();
                  history.push("/signup");
                }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
