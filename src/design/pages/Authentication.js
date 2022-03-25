import React, { useState } from "react";
import { Button, Paper, ButtonGroup } from "@material-ui/core";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import WidgetsRoundedIcon from "@material-ui/icons/WidgetsRounded";
import Avatar from "@material-ui/core/Avatar";

import CssBaseline from "@material-ui/core/CssBaseline";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

import Container from "@material-ui/core/Container";
import * as yup from "yup";
import { useFormik } from "formik";
import { createUser } from "../../logic/utils/userApiCall";
import bcrypt from "bcryptjs"

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
}));

const signupSchema = yup.object().shape({
  email: yup.string().email("Incorrect email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be of atleast 6 characters")
    .required("Password is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Incorrect email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be of atleast 6 characters")
    .required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const salt = bcrypt.genSaltSync(6);

export const Authentication = () => {
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(false);
  const formik = useFormik({
    initialValues: isLogin
      ? initialValues
      : { ...initialValues, firstName: "", lastName: "" },
    validationSchema: isLogin ? loginSchema : signupSchema,
    onSubmit: (values) => {
      createUser({
        email: values.email,
        password: bcrypt.hashSync(values.password,salt),
        firstName: values.firstName,
        lastName: values.lastName,
      })
        .then((res) => alert(res.data.msg))
        .catch((err) => alert(err));
    },
  });
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" style={{ color: "white" }} href="#">
            <WidgetsRoundedIcon />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  style={{ color: "white", fontSize: "30px" }}
                >
                  Trello
                </a>
              </li>
            </ul>
            <form class="d-flex">
              <TextField
                id="standard-basic"
                placeholder="Search"
                style={{ color: "white", padding: "0" }}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.margin}
              >
                Search
              </Button>

              <ButtonGroup
                variant="contained"
                color="primary"
                aria-label="contained primary button group"
                size="small"
                className={classes.margin}
              >
                <Button>LOGIN</Button>
                <Button>SIGN UP</Button>
              </ButtonGroup>
            </form>
          </div>
        </div>
      </nav>
      <Container
        component="main"
        maxWidth="xs"
        style={{ backgroundColor: "#DAFFFA" }}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <VpnKeyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isLogin ? `Sign In` : `Sign Up`}
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <Grid container spacing={2}>
              {isLogin ? null : (
                <>
                  <Grid item xs={12} sm={6} style={{}}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      color="warning"
                      varient="standard"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName)
                      }
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="warning"
                      varient="standard"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
                      }
                      helperText={
                        formik.touched.lastName && formik.errors.lastName
                      }
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              style={{ float: "centre" }}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isLogin ? `Sign In` : `Sign Up`}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin
                    ? `Do not have an account? Sign Up`
                    : `Already have an account? Sign in`}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        {/* <Box mt={5}>
        <Copyright />
      </Box> */}
      </Container>
      );
    </div>
  );
};
