import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Checkbox,
  Stack,
} from "@mui/material";
import Head from "next/head";
import axios from "axios";
import { AuthRegisterRequest, IFormRegister } from "../../interfaces/Auth";
import { useRouter } from "next/router";

function Register() {
  const navigate = useRouter();

  const methods = useForm<IFormRegister>({
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email("Enter valid email address")
          .required("Email is required")
          .typeError("Email is required"),
        name: yup
          .string()
          .trim()
          .matches(/^[a-zA-Z ]+$/, "Name can only contain letters and spaces")
          .required("Name is required"),
        password: yup
          .string()
          .required("Password is required")
          .typeError("Password is required"),
        confirmationPassword: yup
          .string()
          .oneOf([yup.ref("password")], "Password must be same")
          .required("Password is required"),
      })
    ),
    defaultValues: {
      isCompany: 0,
    },
  });

  const { control, handleSubmit, setValue } = methods;

  const onSubmit: SubmitHandler<IFormRegister> = async (
    data: IFormRegister
  ) => {
    try {
      const payload: AuthRegisterRequest = data;
      const url = "https://onboarding-backend.bosshire.online/auth/register";
      await axios.post(url, payload, {
        headers: {
          AccessControlAllowOrigin: "*",
        },
      });
      navigate.push("/auth/login");
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
      <Head>
        <title>Job Portal</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Card sx={{ minWidth: "800px", padding: "24px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography
            variant="h4"
            fontWeight="bold"
            marginBottom="32px"
            align="center"
          >
            Register
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
              name="name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Name"
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
            <Controller
              name="confirmationPassword"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Confirm Password"
                  type="password"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <FormControlLabel
              label="Register as Company"
              control={
                <Controller
                  name="isCompany"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value === 1}
                      onChange={(e, value) => {
                        setValue("isCompany", value ? 1 : 0);
                      }}
                    />
                  )}
                />
              }
            />
            <Button
              variant="contained"
              size="large"
              type="submit"
              color="primary"
            >
              Register
            </Button>
            <Button href="/auth/login">Login here</Button>
          </Stack>
        </form>
      </Card>
    </Grid>
  );
}

export default Register;
