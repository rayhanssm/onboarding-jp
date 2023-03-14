import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, TextField, Typography, Stack, Alert } from "@mui/material";
import Link from "next/link";
import { IFormJob } from "@/interfaces/Job";
import axios from "axios";
import { useRouter } from "next/router";
import { getCookie } from "@/services/cookie";

function UpdateJob() {
  const navigate = useRouter();
  const router = useRouter();
  const { id } = router.query;

  const methods = useForm<IFormJob>({
    resolver: yupResolver(
      yup.object().shape({
        title: yup
          .string()
          .trim()
          .matches(/^[a-zA-Z ]+$/, "Title can only contain letters and spaces")
          .required("Title is required"),
        description: yup
          .string()
          .trim()
          .matches(
            /^.*\S.*$|^[\s\S]*\n[\s\S]*$/,
            "Description cannot only contain spaces"
          )
          .required("Description is required"),
        open_date: yup.date().required("Open date is required"),
        close_date: yup
          .date()
          .required("Close date is required")
          .min(yup.ref("open_date"), "Close date must be after open date"),
      })
    ),
  });

  const { control, handleSubmit, reset } = methods;

  const [token, setToken] = useState<any | null>(null);

  useEffect(() => {
    let token = getCookie("access_token");
    setToken(token);
    console.log(token);
  }, []);

  const getJobDetail = async () => {
    try {
      const url = `https://onboarding-backend.bosshire.online/jobs/${id}`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      reset(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!id || !token) return;
    getJobDetail();
  }, [id, token]);

  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<IFormJob> = async (data: IFormJob) => {
    try {
      const payload: IFormJob = data;
      const url = `https://onboarding-backend.bosshire.online/jobs/${id}`;

      await axios.put(url, payload, {
        headers: {
          AccessControlAllowOrigin: "*",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate.push("/jobs");
    } catch (e: any) {
      setError(e.response.data.error);
    }
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Box sx={{ flexGrow: 1 }} marginBottom="24px">
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Button color="inherit" component={Link} href="/jobs">
                Jobs
              </Button>
              <Button color="inherit" component={Link} href="/applications">
                Applications
              </Button>
            </Box>
            <Button variant="contained" color="error" component={Link} href="/">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Card sx={{ minWidth: "800px", padding: "24px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography
            variant="h4"
            fontWeight="bold"
            marginBottom="32px"
            align="center"
          >
            Update Job
          </Typography>
          <Stack spacing={2}>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Title"
                  value={field.value}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Description"
                  multiline
                  rows={4}
                  maxRows={10}
                  value={field.value}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="open_date"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    {...field}
                    label="Open Date"
                    inputFormat="DD/MM/YYYY"
                    value={field.value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="close_date"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    {...field}
                    label="Close Date"
                    inputFormat="DD/MM/YYYY"
                    value={field.value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              size="large"
              type={"submit"}
              color="primary"
            >
              Update Job
            </Button>
          </Stack>
        </form>
      </Card>
    </>
  );
}

export default UpdateJob;
