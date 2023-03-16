import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { IJobList } from "../interfaces/Job";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  CardActions,
  Pagination,
} from "@mui/material";
import Link from "next/link";
import { deleteCookie, getCookie, setCookie } from "@/services/cookie";
import axios from "axios";
import { differenceInDays, format } from "date-fns";

function JobListCandidate() {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<any | null>(null);

  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    let getUser = getCookie("user");
    setUser(JSON.parse(getUser));
    let token = getCookie("access_token");
    setToken(token);
  }, []);

  const [page, setPage] = useState(1);

  const handlePageChange = (event: any, value: any) => {
    setPage(value);
  };

  const size: number = data.length;

  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;
  const pageData:any = data.slice(startIndex, endIndex);

  const getJobs = async () => {
    try {
      const baseUrl = `https://onboarding-backend.bosshire.online/jobs?page=${page}&size=${9}`;
      let url = title == "" ? `${baseUrl}` : `${baseUrl}&title=${title}`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!token) return;
    getJobs();
  }, [token, title, page]);

  const onDelete = async (id: number) => {
    try {
      const url = `https://onboarding-backend.bosshire.online/jobs/${id}`;
      await axios.delete(url, {
        headers: {
          AccessControlAllowOrigin: "*",
          Authorization: `Bearer ${token}`,
        },
      });
      getJobs();
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (job_id: number) => {
    try {
      const url = "https://onboarding-backend.bosshire.online/applications";
      await axios.post(
        url,
        {
          job_id,
        },
        {
          headers: {
            AccessControlAllowOrigin: "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  let jobContent;

  if (user && user.role === "Company") {
    jobContent = (
      <>
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
              <Button
                variant="contained"
                color="error"
                component={Link}
                href="/auth/login"
                onClick={() => deleteCookie("user", "access_token")}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            sx={{ width: "50%" }}
          />
        </Stack>
        <Grid container>
          <Button
            variant="contained"
            color="success"
            component={Link}
            href="/create-job"
            sx={{ marginX: "32px" }}
          >
            Create Job
          </Button>
          {data.map((d: IJobList) => (
            <Grid key={d.id} item xs={12}>
              <Card
                sx={{
                  padding: "8px",
                  marginX: "32px",
                  marginY: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="primary"
                    component={Link}
                    href={"jobs/" + d.id}
                    sx={{
                      ":hover": {
                        color: "darkblue",
                        transition: "0.2s",
                      },
                      textDecoration: "none",
                    }}
                  >
                    {d.title}
                  </Typography>
                  <Typography variant="body1" marginBottom="4px">
                    {format(new Date(d.open_date), "yyyy-MM-dd")} until{" "}
                    {format(new Date(d.close_date), "yyyy-MM-dd")}
                  </Typography>
                  <Typography variant="body2" color="GrayText">
                    {d.application_count} Applicants
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Box>
                    <Button
                      variant="contained"
                      size="large"
                      type="submit"
                      color="error"
                      onClick={() => onDelete(d.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Pagination
            count={pageData}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      </>
    );
  } else {
    jobContent = (
      <>
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
              <Button
                variant="contained"
                color="error"
                component={Link}
                href="/auth/login"
                onClick={() => deleteCookie("user", "access_token")}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            sx={{ width: "50%" }}
          />
        </Stack>
        <Grid container>
          {data.map((d: IJobList) => (
            <Grid key={d.id} item xs={4} marginTop="8px">
              <Card sx={{ padding: "8px", marginX: "8px", marginY: "16px" }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="primary"
                    component={Link}
                    href={"jobs/" + d.id}
                    sx={{
                      ":hover": {
                        color: "darkblue",
                        transition: "0.2s",
                      },
                      textDecoration: "none",
                    }}
                  >
                    {d.title}
                  </Typography>
                  <Typography variant="body1" color="GrayText" marginY="8px">
                    {d.company}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="GrayText"
                    marginTop="8px"
                    marginBottom="4px"
                  >
                    {d.application_count} Applicants
                  </Typography>
                  <Typography variant="body1">
                    {differenceInDays(
                      new Date(d.close_date),
                      new Date(d.open_date)
                    )}{" "}
                    days remaining
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    component={Link}
                    href={"applications/"}
                    variant="contained"
                    size="large"
                    type="submit"
                    color="primary"
                    onClick={() => onSubmit(d.id)}
                  >
                    Apply
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Pagination
            count={pageData}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      </>
    );
  }

  return <>{jobContent}</>;
}

export default JobListCandidate;
