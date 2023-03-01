import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { IJob } from "./Interface/JobDetail";
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
  CardMedia,
} from "@mui/material";
import Link from "next/link";

function JobListCompany() {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [applicationCount, setApplicationCount] = useState(0);
  const [openDate, setOpenDate] = useState(0);
  const [company, setCompany] = useState("");
  const [page, setPage] = useState(1);

  // const handlePageChange = (e, value) => {
  //   setPage(value);
  // };

  const [data, setData] = useState<IJob[]>([
    {
      id: 1,
      title: "Frontend Developer",
      applicationCount: 2,
      openDate: new Date("2023-02-28"),
      closeDate: new Date("2023-03-28"),
      company: "BOSSHIRE Indonesia",
    },
    {
      id: 2,
      title: "Backend Developer",
      applicationCount: 2,
      openDate: new Date("2023-02-28"),
      closeDate: new Date("2023-03-28"),
      company: "BOSSHIRE Indonesia",
    },
    {
      id: 3,
      title: "QA",
      applicationCount: 1,
      openDate: new Date("2023-02-28"),
      closeDate: new Date("2023-03-28"),
      company: "BOSSHIRE Indonesia",
    },
    {
      id: 4,
      title: "SDEiT",
      applicationCount: 1,
      openDate: new Date("2023-02-28"),
      closeDate: new Date("2023-03-28"),
      company: "BOSSHIRE Indonesia",
    },
  ]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }} marginBottom="24px">
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Button
                color="inherit"
                component={Link}
                href="/job-list-candidates"
              >
                Jobs
              </Button>
              <Button color="inherit" component={Link} href="/hhh">
                Applications
              </Button>
            </Box>
            <Button variant="contained" color="error" component={Link} href="/">
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
        {data.map((d) => (
          <Grid item xs={12}>
            <Card
              sx={{
                padding: "16px",
                marginX: "8px",
                marginY: "16px",
                display: "flex",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column " }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" marginBottom="8px">
                    {d.title}
                  </Typography>
                  <Typography variant="body1" marginBottom="4px">
                    {d.company}
                  </Typography>
                  <Typography variant="body2" color="GrayText">
                    {d.applicationCount} Applicants
                  </Typography>
                </CardContent>
              </Box>
              <CardActions>
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  color="error"
                >
                  Delete
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

export default JobListCompany;
