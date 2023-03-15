import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
  Box,
  Grid,
  TextField,
  Typography,
  FormControl,
  Button,
  Stack,
  Card,
  CardContent,
  CardActions,
  Pagination,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/router";
import { deleteCookie, getCookie } from "@/services/cookie";
import axios from "axios";
import { format } from "date-fns";
import {
  IApplicationsCandidate,
  IApplicationsCompany,
} from "@/interfaces/Application";

function Applications() {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<any | null>(null);

  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    let getUser = getCookie("user");
    setUser(JSON.parse(getUser));
  }, []);

  useEffect(() => {
    let token = getCookie("access_token");
    setToken(token);
  }, []);

  const onSubmit = async (application_id: number, status_id: number) => {
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

  const [page, setPage] = useState(1);

  const handlePageChange = (event: any, value: any) => {
    setPage(value);
  };

  const size: number = data.length;

  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;
  const pageData: any = data.slice(startIndex, endIndex);

  const getApplicants = async () => {
    try {
      const url = "https://onboarding-backend.bosshire.online/applications";
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!token) return;
    getApplicants();
  }, [token, title, page]);

  const [applicationStatus, setApplicationStatus] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setApplicationStatus(event.target.value as string);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let applicationsContent;

  if (user && user.role === "Company") {
    applicationsContent = (
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
          <Box width="200px">
            <FormControl fullWidth size="small">
              <InputLabel>Application Status</InputLabel>
              <Select
                value={applicationStatus}
                label="Application status"
                onChange={handleChange}
              >
                <MenuItem>Applied</MenuItem>
                <MenuItem>HR Interview</MenuItem>
                <MenuItem>Client Interview</MenuItem>
                <MenuItem>Passed</MenuItem>
                <MenuItem>Rejected</MenuItem>
                <MenuItem>Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button variant="outlined">Search</Button>
        </Stack>
        <Grid item xs={12}>
          {data.length > 0 &&
            data.map((d: IApplicationsCompany) => (
              <Card
                key={d.id}
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
                    marginBottom="8px"
                    color="primary"
                    component={Link}
                    href={"applications/" + d.id}
                    sx={{
                      ":hover": {
                        color: "darkblue",
                        transition: "0.2s",
                      },
                      textDecoration: "none",
                    }}
                  >
                    {d.job_title}
                  </Typography>
                  <Typography variant="body1" marginBottom="4px">
                    {d.candidate}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Box marginRight="24px">
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      marginBottom="4px"
                    >
                      {d.last_status}
                    </Typography>
                    <Typography variant="body1">
                      {format(new Date(d.last_process_date), "yyyy-MM-dd")}
                    </Typography>
                  </Box>
                  <Button
                    id="button"
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
                    <MenuItem onClick={() => onSubmit(d.id, 2)}>
                      HR Interview
                    </MenuItem>
                    <MenuItem onClick={() => onSubmit(d.id, 3)}>
                      Client Interview
                    </MenuItem>
                    <MenuItem onClick={() => onSubmit(d.id, 4)}>
                      Passed
                    </MenuItem>
                    <MenuItem onClick={() => onSubmit(d.id, 5)}>
                      Rejected
                    </MenuItem>
                  </Menu>
                </CardActions>
              </Card>
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
    applicationsContent = (
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
            sx={{ width: "50%" }}
          />
          <Box width="200px">
            <FormControl fullWidth size="small">
              <InputLabel>Application Status</InputLabel>
              <Select
                value={applicationStatus}
                label="Application status"
                onChange={handleChange}
              >
                <MenuItem value={10}>Applied</MenuItem>
                <MenuItem value={20}>HR Interview</MenuItem>
                <MenuItem value={30}>Client Interview</MenuItem>
                <MenuItem value={30}>Passed</MenuItem>
                <MenuItem value={30}>Rejected</MenuItem>
                <MenuItem value={30}>Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button variant="outlined">Search</Button>
        </Stack>
        {data.map((d: IApplicationsCandidate) => (
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
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  marginBottom="8px"
                  color="primary"
                  component={Link}
                  href={"applications/" + d.id}
                  sx={{
                    ":hover": {
                      color: "darkblue",
                      transition: "0.2s",
                    },
                    textDecoration: "none",
                  }}
                >
                  {d.job_title}
                </Typography>
                <Typography variant="body1" marginBottom="4px">
                  {d.company}
                </Typography>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Box marginRight="24px">
                  <Typography variant="h5" fontWeight="bold" marginBottom="4px">
                    {d.last_status}
                  </Typography>
                  <Typography variant="body1">
                    {format(new Date(d.last_process_date), "yyyy-MM-dd")}
                  </Typography>
                </Box>
                <Button
                  id="button"
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
                  <MenuItem onClick={() => onSubmit(d.id, 5)}>
                    Cancelled
                  </MenuItem>
                </Menu>
              </CardActions>
            </Card>
          </Grid>
        ))}
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

  return <>{applicationsContent}</>;
}

export default Applications;
