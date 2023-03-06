import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { IJobListDetail } from "../../interfaces/Job";
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
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCookie } from "@/services/cookie";

function ApplicationDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    let getUser = getCookie("user");
    setUser(JSON.parse(getUser));
  }, []);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
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
          paddingX="8px"
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
            <Typography variant="h4">Software Engineer</Typography>
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
            <MenuItem onClick={handleClose}>HR Interview</MenuItem>
            <MenuItem onClick={handleClose}>Client Interview</MenuItem>
            <MenuItem onClick={handleClose}>Passed</MenuItem>
          </Menu>
        </Box>
        <Box paddingX="8px" marginBottom="32px">
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            marginBottom="4px"
          >
            Candidate
          </Typography>
          <Typography variant="h4">Ari Davis</Typography>
        </Box>
        <Box paddingX="8px" marginBottom="32px">
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            marginBottom="4px"
          >
            Description
          </Typography>
          <Typography variant="body1" marginBottom="4px">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            porro sunt similique vero ut reprehenderit voluptatem aliquam
            suscipit. Doloribus rem ut cumque, excepturi mollitia incidunt
            labore, nulla eius commodi asperiores et quam fugit enim officia
            quaerat hic fugiat delectus aut, laboriosam autem consequatur
            officiis reiciendis earum? Similique consectetur iusto quam.
          </Typography>
        </Box>
        <Box paddingX="8px">
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            marginBottom="4px"
          >
            Application Process
          </Typography>
          <Grid item xs={12}>
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
                  Interview
                </Typography>
              </CardContent>
              <CardContent sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography variant="body1">2023-01-01</Typography>
              </CardContent>
            </Card>
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
                  Applied
                </Typography>
              </CardContent>
              <CardContent sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography variant="body1">2023-01-01</Typography>
              </CardContent>
            </Card>
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
                  HR Interview
                </Typography>
              </CardContent>
              <CardContent sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography variant="body1">2023-01-01</Typography>
              </CardContent>
            </Card>
          </Grid>
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
          paddingX="8px"
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
            <Typography variant="h4">Software Engineer</Typography>
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
            <MenuItem onClick={handleClose}>Cancelled</MenuItem>
          </Menu>
        </Box>
        <Box paddingX="8px" marginBottom="32px">
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            marginBottom="4px"
          >
            Company
          </Typography>
          <Typography variant="h4">BOSSHIRE</Typography>
        </Box>
        <Box paddingX="8px" marginBottom="32px">
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            marginBottom="4px"
          >
            Description
          </Typography>
          <Typography variant="body1" marginBottom="4px">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            porro sunt similique vero ut reprehenderit voluptatem aliquam
            suscipit. Doloribus rem ut cumque, excepturi mollitia incidunt
            labore, nulla eius commodi asperiores et quam fugit enim officia
            quaerat hic fugiat delectus aut, laboriosam autem consequatur
            officiis reiciendis earum? Similique consectetur iusto quam.
          </Typography>
        </Box>
        <Box paddingX="8px">
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            marginBottom="4px"
          >
            Application Process
          </Typography>
          <Grid item xs={12}>
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
                  Interview
                </Typography>
              </CardContent>
              <CardContent sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography variant="body1">2023-01-01</Typography>
              </CardContent>
            </Card>
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
                  Applied
                </Typography>
              </CardContent>
              <CardContent sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography variant="body1">2023-01-01</Typography>
              </CardContent>
            </Card>
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
                  HR Interview
                </Typography>
              </CardContent>
              <CardContent sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography variant="body1">2023-01-01</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </>
    );
  }

  return <div>{applicationDetailContent}</div>;
}

export default ApplicationDetail;
