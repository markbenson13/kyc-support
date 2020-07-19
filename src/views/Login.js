import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import FirebaseConfig from "../config/FirebaseConfig";
import { AuthContext } from "../auth/Auth";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Paper,
  TextField,
} from "@material-ui/core";
import Logo from "../assets/images/logo.svg";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password, errorMessage } = event.target.elements;
      try {
        await FirebaseConfig.auth().signInWithEmailAndPassword(
          email.value,
          password.value
        );
        history.push("/kyc");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/kyc" />;
  }

  return (
    <Box p={2} className="login-wrapper">
      {/* <Container maxWidth="xs"> */}
      <Grid
        container
        height="100%"
        direction="row"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={3}>
          <Paper elevation={3} className="form-container">
            <Box display="flex" alignItems="center" flexDirection="column">
              <img className="logo" src={Logo} alt="Logo" />
              <h1 className="heading-title">Login to your account</h1>
            </Box>
            <form className="form-wrapper" onSubmit={handleLogin}>
              {/* <p className="error-message">{errorMessage}</p> */}
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                placeholder="Enter email address"
                autoFocus
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                placeholder="Enter password"
                autoFocus
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Grid container>
                <Grid item xs align="end">
                  <Link
                    to="passwordReset"
                    className="link-text"
                    variant="body2"
                    color="#49c0f9"
                  >
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Button
                className="btn btn-primary"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
      {/* </Container> */}
    </Box>
  );
};

export default withRouter(Login);
