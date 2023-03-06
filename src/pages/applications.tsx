import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
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
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCookie } from "@/services/cookie";

function Applications() {
  const [user, setUser] = useState<any | null>(null);
  
  useEffect(() => {
    let getUser = getCookie("user");
    setUser(JSON.parse(getUser));
  }, []);

  const [id, setId] = useState(0);

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
        <Grid item xs={12}>
          <Card
            component={Link}
            href={"applications/" + id}
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
              >
                Software Engineer
              </Typography>
              <Typography variant="h6" marginBottom="4px">
                Ari Davis
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Box marginRight="24px">
                <Typography variant="h5" fontWeight="bold" marginBottom="4px">
                  Interview
                </Typography>
                <Typography variant="body1">2023-01-01</Typography>
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
                <MenuItem onClick={handleClose}>HR Interview</MenuItem>
                <MenuItem onClick={handleClose}>Client Interview</MenuItem>
                <MenuItem onClick={handleClose}>Passed</MenuItem>
              </Menu>
            </CardActions>
          </Card>
        </Grid>
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
        <Grid item xs={12}>
          <Card
            component={Link}
            href={"applications/" + id}
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
              >
                Software Engineer
              </Typography>
              <Typography variant="h6" marginBottom="4px">
                BOSSHIRE
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Box marginRight="24px">
                <Typography variant="h5" fontWeight="bold" marginBottom="4px">
                  Interview
                </Typography>
                <Typography variant="body1">2023-01-01</Typography>
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
                <MenuItem onClick={handleClose}>Applied</MenuItem>
                <MenuItem onClick={handleClose}>Cancelled</MenuItem>
              </Menu>
            </CardActions>
          </Card>
        </Grid>
      </>
    );
  }

  return <>{applicationsContent}</>;
}

export default Applications;
