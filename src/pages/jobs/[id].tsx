import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
  IFormJob,
  IJobDetailCandidate,
  IJobDetailCompany,
  IJobList,
} from "../../interfaces/Job";
import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  Pagination,
  Alert,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCookie } from "@/services/cookie";
import axios from "axios";
import { format } from "date-fns";
import ReactDOM from "react-dom/client";

function JobDetail() {
  const navigate = useRouter();
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<any | null>(null);
  const [dataCompany, setDataCompany] = useState<IJobDetailCompany | null>(
    null
  );
  const [dataCandidate, setDataCandidate] =
    useState<IJobDetailCandidate | null>(null);
  const [dataApplicants, setDataApplicants] = useState([]);

  useEffect(() => {
    let getUser = getCookie("user");
    setUser(JSON.parse(getUser));
  }, []);

  useEffect(() => {
    let token = getCookie("access_token");
    setToken(token);
  }, []);

  const getJobDetail = async () => {
    try {
      const url = `https://onboarding-backend.bosshire.online/jobs/${id}`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataCompany(res.data.data);
      setDataApplicants(res.data.data.applications);
      setDataCandidate(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!id || !token) return;
    getJobDetail();
  }, [id, token]);

  const [error, setError] = useState("");

  const onDelete = async () => {
    try {
      const url = `https://onboarding-backend.bosshire.online/jobs/${id}`;
      await axios.delete(url, {
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

  const onSubmit = async (job_id: number | undefined) => {
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

  let jobDetailContent;

  if (user && user.role === "Company") {
    jobDetailContent = (
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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          paddingX="32px"
          marginBottom="24px"
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              marginBottom="4px"
            >
              Job Title
            </Typography>
            <Typography variant="h4">{dataCompany?.title}</Typography>
          </Box>
          <Stack
            direction="row"
            spacing={2}
            display="flex"
            justifyContent="flex-end"
          >
            <Button
              variant="contained"
              size="large"
              type="submit"
              color="warning"
              component={Link}
              href={"../update-job/" + dataCompany?.id}
            >
              Update
            </Button>
            <Button
              variant="contained"
              size="large"
              type="submit"
              color="error"
              onClick={onDelete}
            >
              Delete
            </Button>
          </Stack>
        </Box>
        <Box paddingX="32px" marginBottom="24px">
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            marginBottom="4px"
          >
            Description
          </Typography>
          <Typography variant="body2">{dataCandidate?.description}</Typography>
        </Box>
        <Box paddingX="32px">
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            marginBottom="4px"
          >
            Applications
          </Typography>
          <Grid item xs={12}>
            {dataApplicants.map((d: IJobDetailCompany) => (
              <Card
                key={d.id}
                sx={{
                  padding: "8px",
                  marginX: "8px",
                  marginY: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    marginBottom="8px"
                    component={Link}
                    href={"../applications/" + d.id}
                    sx={{
                      ":hover": {
                        color: "darkblue",
                        transition: "0.2s",
                      },
                      textDecoration: "none",
                    }}
                  >
                    {d.candidate}
                  </Typography>
                </CardContent>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1" marginRight="12px">
                    {format(new Date(d.last_process_date), "yyyy-MM-dd")}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {d.last_status}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Box>
      </>
    );
  } else {
    jobDetailContent = (
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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          paddingX="32px"
          marginBottom="24px"
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              marginBottom="4px"
            >
              Job Title
            </Typography>
            <Typography variant="h4">{dataCandidate?.title}</Typography>
          </Box>
        </Box>
        <Box paddingX="32px" marginBottom="24px">
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            marginBottom="4px"
          >
            Description
          </Typography>
          <Typography variant="body2">{dataCandidate?.description}</Typography>
        </Box>
        <Box paddingX="32px" marginBottom="24px">
          <Button
            component={Link}
            href={"../applications/"}
            variant="contained"
            size="large"
            type="submit"
            color="primary"
            onClick={() => onSubmit(dataCompany?.id)}
          >
            Apply
          </Button>
        </Box>
      </>
    );
  }

  return <div>{jobDetailContent}</div>;
}

export default JobDetail;
