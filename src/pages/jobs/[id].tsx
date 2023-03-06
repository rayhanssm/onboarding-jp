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
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCookie } from "@/services/cookie";

function JobDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState<any | null>(null);
  
  useEffect(() => {
    let getUser = getCookie("user");
    setUser(JSON.parse(getUser));
  }, []);

  let jobDetailContent;

  if (user && user.role === "Company") {
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
              href="/update-job"
            >
              Update
            </Button>
            <Button
              variant="contained"
              size="large"
              type="submit"
              color="error"
            >
              Delete
            </Button>
          </Stack>
        </Box>
        <Box paddingX="8px" marginBottom="24px">
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            marginBottom="4px"
          >
            Description
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus, dignissimos ad odio consectetur, repellat sint vitae
            nesciunt minima, hic ut dolores. Ipsum facilis alias qui autem,
            debitis totam unde porro iure eius. Dolores, architecto in,
            provident eius est magnam magni optio consectetur fugiat laborum
            officiis blanditiis explicabo ea, error molestiae!
          </Typography>
        </Box>
        <Box paddingX="8px">
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            marginBottom="4px"
          >
            Applications
          </Typography>
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
                  Ari Davis
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
                  2023-01-01
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  Interview
                </Typography>
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
                  John Doe
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
                  2023-01-01
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  Interview
                </Typography>
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
                  Ray
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
                  2023-01-01
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  Interview
                </Typography>
              </CardContent>
            </Card>
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
        </Box>
        <Box paddingX="8px" marginBottom="24px">
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            marginBottom="4px"
          >
            Description
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus, dignissimos ad odio consectetur, repellat sint vitae
            nesciunt minima, hic ut dolores. Ipsum facilis alias qui autem,
            debitis totam unde porro iure eius. Dolores, architecto in,
            provident eius est magnam magni optio consectetur fugiat laborum
            officiis blanditiis explicabo ea, error molestiae!
          </Typography>
        </Box>
        <Box paddingX="8px" marginBottom="24px">
          <Button
            variant="contained"
            size="large"
            type="submit"
            color="primary"
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
