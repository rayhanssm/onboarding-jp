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
} from "@mui/material";
import Link from "next/link";
import axios from "axios";
import { AuthLoginRequest, IFormLogin } from "../../Interface/Auth";
import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form/dist/types";
import { getCookie, setCookie } from "@/services/cookie";

function Login() {
  const navigate = useRouter();

  // const cookies = new Cookies();

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

  const onSubmit: SubmitHandler<IFormLogin> = async (data: IFormLogin) => {
    try {
      const payload: AuthLoginRequest = data;
      const url = "https://onboarding-backend.bosshire.online/auth/login";
      const res = await axios.post(url, payload, {});
      // console.log(res.data)
      const { token } = res.data.data;
      console.log(token);
      setCookie("access_token", token, 240);
      getCookie("access_token");
      
      navigate.push("/jobs");
    } catch (e) {
      console.log(e);
    }
  };

  return (
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
  );
}

export default Login;
