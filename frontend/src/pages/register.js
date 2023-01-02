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
import React, { useState } from "react";
import instance from "../axios";
import { useNavigate } from "react-router-dom";
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

const RegisterPage = () => {
  const navigate = useNavigate();
  const [mail, setmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleName = async (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = async (e) => {
    setmail(e.target.value);
  };
  const handlePassword = async (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async () => {
    const res = await instance.post("/user/register", {
      username: username,
      email: mail,
      password: password,
    });
    console.log(res.data.data);
    if (res.data.data === "success") {
      navigate("/login");
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
      <Container
        component="main"
        maxWidth="xs"
        style={{ marginTop: "150px", marginLeft: "700px" }}
      >
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
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                style={{ marginTop: "10px", width: "400px" }}
                onChange={(e) => handleName(e)}
                required
                fullWidth
                id="userName"
                label="User Name"
                name="username"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ marginTop: "10px" }}
                onChange={(e) => handleEmail(e)}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ marginTop: "10px" }}
                onChange={(e) => handlePassword(e)}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>

            <Button
              onClick={handleSignUp}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </div>
  );
};
export default RegisterPage;
