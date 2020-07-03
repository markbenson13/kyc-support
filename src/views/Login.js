// import React, { Component } from "react";
// import FirebaseConfig from "../config/FirebaseConfig";
// import {
//   Box,
//   Button,
//   Container,
//   Grid,
//   Link,
//   Paper,
//   TextField,
// } from "@material-ui/core";
// import Logo from "../assets/images/logo.svg";
// import { AuthContext } from "../auth/Auth";

// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.login = this.login.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.state = {
//       email: "",
//       password: "",
//       errorMessage: null,
//     };
//   }

//   login(e) {
//     e.preventDefault();
//     FirebaseConfig.auth()
//       .signInWithEmailAndPassword(this.state.email, this.state.password)
//       .then((res) => {})
//       .catch((error) => {
//         console.log(error);
//         this.setState({ errorMessage: error.message });
//       });
//   }

//   handleChange(e) {
//     this.setState({ [e.target.name]: e.target.value });
//     console.log({ [e.target.name]: e.target.value });
//   }

//   const { currentUser } = useContext(AuthContext);

//   if (currentUser) {
//     return <Redirect to="/dashboard" />
//   }

//   render() {

// }
// }

// export default Login;

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
        history.push("/dashboard");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  // return (
  //   <div>
  //     <h1>Log in</h1>
  //     <form onSubmit={handleLogin}>
  //       <label>
  //         Email
  //         <input name="email" type="email" placeholder="Email" />
  //       </label>
  //       <label>
  //         Password
  //         <input name="password" type="password" placeholder="Password" />
  //       </label>
  //       <button type="submit">Log in</button>
  //     </form>
  //   </div>
  // );
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
        <Grid item xs={2}>
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
                  <Link to="passwordReset" variant="body2" color="#01AFF7">
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
