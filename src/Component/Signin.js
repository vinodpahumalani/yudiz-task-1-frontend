import React, { useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { httpPost } from "../ApiServices/httpRequests"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { confirmAlert } from "react-confirm-alert"
import { saveToken } from "../AuthTokenManager"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
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
}))

export default function Signup() {
  const classes = useStyles()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const history = useHistory()

  const onLoginClick = async (e) => {
    e.preventDefault()
    try {
      const res = await httpPost({
        subUrl: "/users/login/",
        body: formData,
      })

      if (res.success) {
        saveToken(res.result.data.id, res.result.data.token)
        history.replace("/")
        return
      } else {
        confirmAlert({
          title: "Error",
          message: res.result.message ?? "Invalid email/mobile or password",
          buttons: [
            {
              label: "OK",
            },
          ],
        })
        return
      }
    } catch (error) {
      console.log(error)
      confirmAlert({
        title: "Error",
        message:
          "Something Went Wrong. Check your internet connection or try again after sometime.",
        buttons: [
          {
            label: "OK",
          },
        ],
      })
      return
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} method="POST" onSubmit={onLoginClick}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email/Mobile"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
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
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
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
            <Grid item>
              <Link
                to="/register"
                variant="body2"
                style={{ cursor: "pointer" }}
              >
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
