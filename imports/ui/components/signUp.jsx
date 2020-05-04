import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { InputLabel, Select, MenuItem, FormControl } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";

import _ from "lodash";
import { Accounts } from "meteor/accounts-base";
import { useForm } from "react-hook-form";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  let history = useHistory();

  const teamList = [
    { _id: "EXRe4MxgWbgaXxwDy", title: "All" },
    { _id: "BMjN2YfnFPTzNwE7J", title: "Sales" },
    { _id: "B3bpx45EuLgRm9FMJ", title: "IT" },
  ];
  const [team, setTeam] = useState(teamList[0]._id);
  const { register, handleSubmit, errors, setValue } = useForm();
  const [serverError, setServerError] = useState("");
  const onSubmit = (data) => {
    Accounts.createUser(
      {
        username: data.username,
        password: data.password,
        profile: {
          firstName: data.firstName,
          lastName: data.lastName,
          team: data.team,
        },
      },
      (err) => {
        setServerError(err);
        err && console.log("Sign up  callback ", err);
        if (!err) history.push("/home"); //window.location = "/home";
      }
    );
  };
  const handleTeamChange = (event) => {
    setTeam(event.target.value);
    setValue("team", _.find(teamList, ["_id", event.target.value]));
  };
  React.useEffect(() => {
    register({ name: "team" }); //{ required: true });          just for debug
    setValue("team", teamList[0]);
  }, [register]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                helperText={
                  errors && errors.firstName ? errors.firstName.type : " "
                }
                inputRef={register({ required: `Please enter firstName.` })}
                error={_.get(errors, "firstName") ? true : false}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                helperText={
                  errors && errors.lastName ? errors.lastName.type : " "
                }
                inputRef={register({ required: `Please enter lastName.` })}
                error={_.get(errors, "lastName") ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                inputRef={register({
                  required: `Please enter your username.`,
                })}
                helperText={
                  (serverError && serverError.reason) ||
                  (errors && errors.username ? errors.username.type : " ")
                }
                error={_.get(errors, "username") ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <TextField
                variant="outlined"
                required
                fullWidth
                name="team"
                label="Team"
                type="text"
                id="team"
                autoComplete="current-password"
                helperText={errors && errors.team ? errors.team.type : " "}
                inputRef={register({ required: `Please enter team.` })}
                error={_.get(errors, "team") ? true : false}
              /> */}

              <FormControl variant="outlined" className="w-100">
                <InputLabel htmlFor="teamSelect">Team</InputLabel>
                <Select
                  labelId="teamSelect"
                  id="team"
                  value={team}
                  label="Team"
                  onChange={handleTeamChange}
                >
                  {teamList.map((t) => {
                    return (
                      <MenuItem key={t._id} value={t._id}>
                        {t.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={
                  errors && errors.password ? errors.password.type : " "
                }
                inputRef={register({ required: `Please enter password.` })}
                error={_.get(errors, "password") ? true : false}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                variant="body2"
                href=""
                onClick={() => {
                  event.preventDefault();
                  history.push("/login");
                }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
