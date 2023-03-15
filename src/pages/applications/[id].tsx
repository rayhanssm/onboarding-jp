import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Pagination,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/router";
import { deleteCookie, getCookie } from "@/services/cookie";
import axios from "axios";
import {
  IApplicationsDetailCandidate,
  IApplicationsDetailCompany,
} from "@/interfaces/Application";
import { format } from "date-fns";

function ApplicationDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<any | null>(null);

  const [dataCompany, setDataCompany] =
    useState<IApplicationsDetailCompany | null>(null);
  const [dataCandidate, setDataCandidate] =
    useState<IApplicationsDetailCandidate | null>(null);
  const [dataProcess, setDataProcess] = useState([]);

  useEffect(() => {
    let getUser = getCookie("user");
    setUser(JSON.parse(getUser));
  }, []);

  useEffect(() => {
    let token = getCookie("access_token");
    setToken(token);
  }, []);

  const getApplicantDetail = async () => {
    try {
      const url = `https://onboarding-backend.bosshire.online/applications/${id}`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataCompany(res.data);
      setDataCandidate(res.data);
      setDataProcess(res.data.processes);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!id || !token) return;
    getApplicantDetail();
  }, [id, token]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onSubmit = async (application_id: any, status_id: number) => {
    try {
      const url = `https://onboarding-backend.bosshire.online/applications/${application_id}/proceed`;
      await axios.post(
        url,
        {
          application_id,
          status_id,
        },
        {
          headers: {
            AccessControlAllowOrigin: "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let applicationDetailContent;

  if (user && user.role === "Company") {
    applicationDetailContent = (
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
            <Typography variant="h4">{dataCompany?.job_title}</Typography>
          </Box>
          <Button
            id="button"
            size="large"
            aria-controls={open ? "menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </Button>
          <Menu
            id="menu"
            aria-labelledby="button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={() => onSubmit(dataCompany?.id, 2)}>
              HR Interview
            </MenuItem>
            <MenuItem onClick={() => onSubmit(dataCompany?.id, 3)}>
              Client Interview
            </MenuItem>
            <MenuItem onClick={() => onSubmit(dataCompany?.id, 4)}>
              Passed
            </MenuItem>
            <MenuItem onClick={() => onSubmit(dataCompany?.id, 5)}>
              Rejected
            </MenuItem>
          </Menu>
        </Box>
        <Box paddingX="32px" marginBottom="32px">
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            marginBottom="4px"
          >
            Candidate
          </Typography>
          <Typography variant="h4">{dataCompany?.candidate}</Typography>
        </Box>
        <Box paddingX="32px">
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            marginBottom="4px"
          >
            Application Process
          </Typography>
          {dataProcess.map((d: IApplicationsDetailCompany) => (
            <Grid item xs={12}>
              <Card
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
                  <Typography variant="h5" fontWeight="bold" marginBottom="8px">
                    {d.status}
                  </Typography>
                </CardContent>
                <CardContent
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Typography variant="body1">
                    {format(new Date(d.date), "yyyy-MM-dd")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Box>
      </>
    );
  } else {
    applicationDetailContent = (
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
            <Typography variant="h4">{dataCandidate?.job_title}</Typography>
          </Box>
          <Button
            id="button"
            size="large"
            aria-controls={open ? "menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </Button>
          <Menu
            id="menu"
            aria-labelledby="button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={() => onSubmit(dataCandidate?.id, 6)}>
              Cancelled
            </MenuItem>
          </Menu>
        </Box>
        <Box paddingX="32px" marginBottom="32px">
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            marginBottom="4px"
          >
            Company
          </Typography>
          <Typography variant="h4">{dataCandidate?.company}</Typography>
        </Box>
        <Box paddingX="32px">
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            marginBottom="4px"
          >
            Application Process
          </Typography>
          {dataProcess?.map((d: IApplicationsDetailCandidate) => (
            <Grid key={d.id} item xs={12}>
              <Card
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
                    {d.status}
                  </Typography>
                </CardContent>
                <CardContent
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Typography variant="body1">
                    {format(new Date(d.date), "yyyy-MM-dd")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Box>
      </>
    );
  }

  return <div>{applicationDetailContent}</div>;
}

export default ApplicationDetail;
