import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormHelperText,
  Checkbox,
  Stack,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import axios from "axios";
import { AuthLoginRequest, IFormLogin, IGetUser } from "../../interfaces/Auth";
import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form/dist/types";
import { getCookie, setCookie } from "@/services/cookie";

function Login() {
  const navigate = useRouter();

  const methods = useForm<IFormLogin>({
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email("Enter valid email address")
          .required("Email is required")
          .typeError("Email is required"),
        password: yup
          .string()
          .required("Password is required")
          .typeError("Password is required"),
      })
    ),
  });

  const { control, handleSubmit } = methods;

  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<IFormLogin> = async (data: IFormLogin) => {
    try {
      const payloadLogin: AuthLoginRequest = data;
      const urlLogin = "https://onboarding-backend.bosshire.online/auth/login";
      const urlGetUser = "https://onboarding-backend.bosshire.online/auth/user";

      const res = await axios.post(urlLogin, payloadLogin);
      const { token } = res.data.data;
      setCookie("access_token", token, 240);

      const resUser = await axios.get(urlGetUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCookie("user", JSON.stringify(resUser.data.data), 240);

      navigate.push("/jobs");
    } catch (e: any) {
      setError(e.response.data.error);
    }
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Card sx={{ minWidth: "800px", padding: "24px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography
              variant="h4"
              fontWeight="bold"
              marginBottom="32px"
              align="center"
            >
              Login
            </Typography>
            <Stack spacing={2}>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Email"
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
              <Button
                variant="contained"
                size="large"
                type="submit"
                color="primary"
              >
                Login
              </Button>
              <Button href="/auth/register">Register here</Button>
            </Stack>
          </form>
        </Card>
      </Grid>
    </>
  );
}

export default Login;
