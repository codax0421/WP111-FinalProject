import { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AuthContext from "../auth";
import instance from "../axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth, auth, setToken } = useContext(AuthContext);
  const [mail, setMail] = useState("");
  const [user, setUser] = useState([]);
  const [password, setPassword] = useState("");
  useEffect(() => {}, [auth]);
  const handlEmail = async (e) => {
    setMail(e.target.value);
  };
  const handlePass = async (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (event) => {
    let res = await instance.post("/user/login", {
      email: mail,
      password: password,
    });
    console.log();
    const userdata = res.data.result[0];
    console.log("user data", userdata);
    if (res.data.status === "success") {
      setAuth({
        userMail: userdata.email,
        userid: userdata._id,
        username: userdata.username,
      });
      setToken("1");
      navigate("/");
    }
  };

  return (
    <div
      style={{
        display: "flex ",
        flexWrap: "wrap",
        background: "linear-gradient( #15A5E8 ,10px, #FFFFFF)",
      }}
    >
      <Container component="main" maxWidth="xs" style={{ marginTop: "150px" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PersonOutlineIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={(e) => handlEmail(e)}
              margin="normal"
              required
              fullWidth
              id="mail"
              label="email"
              name="mail"
              autoComplete="mail"
              autoFocus
            />
            <TextField
              onChange={(e) => handlePass(e)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </div>
  );
};
export default LoginPage;
