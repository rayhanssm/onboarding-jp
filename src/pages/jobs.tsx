import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { IJobList } from "../interfaces/Job";
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
  Button,
  Stack,
  Card,
  CardContent,
  CardActions,
  Pagination,
} from "@mui/material";
import Link from "next/link";
import { getCookie } from "@/services/cookie";
import axios from "axios";
import { differenceInDays, format, subDays } from "date-fns";

function JobListCandidate() {
  const [user, setUser] = useState<any | null>(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    let getUser = getCookie("user");
    setUser(JSON.parse(getUser));
  }, []);

  const getJobs = async () => {
    try {
      const url = "https://onboarding-backend.bosshire.online/jobs";
      const res = await axios.get(url);
      setData(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const [page, setPage] = useState(1);

  // const handlePageChange = (e, value) => {
  //   setPage(value);
  // };

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
                href="/"
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
            sx={{ width: "50%" }}
          />
          <Button variant="outlined">Search</Button>
        </Stack>
        <Grid container>
          <Button
            variant="contained"
            color="success"
            component={Link}
            href="/create-job"
            sx={{ marginX: "8px" }}
          >
            Create Job
          </Button>
          {data.map((d: IJobList) => (
            <Grid key={d.id} item xs={12}>
              <Card
                component={Link}
                href={"jobs/" + d.id}
                sx={{
                  padding: "8px",
                  marginX: "8px",
                  marginY: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  textDecoration: "none",
                }}
              >
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" marginBottom="8px">
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
                    >
                      Delete
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* <Pagination count={3} page={page} onChange={handlePageChange} /> */}
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
                href="/"
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
            sx={{ width: "50%" }}
          />
          <Button variant="outlined">Search</Button>
        </Stack>
        <Grid container>
          {data.map((d: IJobList) => (
            <Grid key={d.id} item xs={4}>
              <Card sx={{ padding: "8px", marginX: "8px", marginY: "16px" }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" marginBottom="8px">
                    {d.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="GrayText"
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
                    href={"jobs/" + d.id}
                    variant="contained"
                    size="large"
                    type="submit"
                    color="primary"
                  >
                    Apply
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* <Pagination count={3} page={page} onChange={handlePageChange} /> */}
      </>
    );
  }

  return <>{jobContent}</>;
}

export default JobListCandidate;
