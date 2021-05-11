import React, { useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { useHistory, withRouter } from "react-router-dom"
import { httpPost } from "../ApiServices/httpRequests"
import { confirmAlert } from "react-confirm-alert"
import { saveToken } from "../AuthTokenManager"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
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

export default function RegisterPage() {
  const classes = useStyles()
  const history = useHistory()
  const mobileRegExp = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
  const emailRegExp = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
  const [emailError, setEmailError] = useState("")
  const [mobileError, setMobileError] = useState("")
  const [formData, setFormData] = useState({
    mobile: "",
    email: "",
    password: "",
  })

  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const onSubmitRegistration = async (e) => {
    e.preventDefault()

    try {
      const res = await httpPost({
        subUrl: "/users",
        body: formData,
      })

      if (res.success) {
        saveToken(res.result.data.id, res.result.data.token)
        history.replace("/")
        return
      } else {
        confirmAlert({
          title: "Error",
          message: res.result.message,
          buttons: [
            {
              label: "OK",
            },
          ],
        })
      }
    } catch (error) {
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
          Register
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={onSubmitRegistration}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="mobile"
            label="Mobile"
            name="mobile"
            value={formData.mobile}
            error={mobileError.length}
            helperText={mobileError}
            onChange={(e) => {
              if (e.target.value.match(mobileRegExp) != null) {
                setMobileError("")
              } else {
                setMobileError("Invalid mobile number.")
              }
              setFormData({ ...formData, mobile: e.target.value })
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            error={emailError.length}
            helperText={emailError}
            value={formData.email}
            onChange={(e) => {
              if (e.target.value.match(emailRegExp) != null) {
                setEmailError("")
              } else {
                setEmailError("Invalid Email.")
              }
              setFormData({ ...formData, email: e.target.value })
            }}
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
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="confirm password"
            type="password"
            id="confirmPassword"
            onChange={(e) =>
              setTimeout(() => {
                if (formData.password != e.target.value) {
                  setConfirmPasswordError(
                    "Confirm Password and Password should have same value."
                  )
                } else {
                  setConfirmPasswordError("")
                }
              }, 400)
            }
            helperText={confirmPasswordError}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={confirmPasswordError.length > 1}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  )
}
