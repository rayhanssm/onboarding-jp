import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
  IJobDetailCandidate,
  IJobDetailCompany,
  IJobList,
} from "../../interfaces/Job";
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
import axios from "axios";

function JobDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<any | null>(null);
  const [dataCompany, setDataCompany] = useState<IJobDetailCompany | null>(
    null
  );
  const [dataCandidate, setDataCandidate] =
    useState<IJobDetailCandidate | null>(null);

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
      setDataCandidate(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!id || !token) return;
    getJobDetail();
  }, [id, token]);

  const handleDelete = async () => {
    try {
      const url = `https://onboarding-backend.bosshire.online/jobs/${id}`;
      const res = await axios.delete(url);
      setDataCompany(res.data)
    } catch (e) {
      console.log(e)
    }
  }

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
              // onClick={() => handleDelete(dataCompany)}
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
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            dolore quia ratione maxime, quae totam impedit quis sapiente
            recusandae necessitatibus repellendus? Voluptatum beatae
            perspiciatis nesciunt eius voluptate sunt accusamus veniam, modi
            necessitatibus. Aspernatur facere, nostrum atque repudiandae minus,
            accusantium perspiciatis dolor inventore soluta aut quasi beatae.
            Nobis maxime perspiciatis, architecto vitae laboriosam recusandae
            inventore ea magni dolore corrupti tempore labore incidunt quam
            deserunt eaque eveniet, provident sit a quos? Cupiditate unde
            nostrum veniam nemo, vero suscipit consequatur asperiores minima
            distinctio est tempore ducimus quisquam iure at deserunt animi eius.
            Minima deserunt sapiente explicabo temporibus consectetur vitae
            pariatur voluptatem, nam praesentium!
          </Typography>
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
          {/* {dataCompany.map((d: IJobDetailCompany) => ( */}
            <Grid item xs={12}>
              <Card
                // component={Link}
                // href={"applications/" + d.id}
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
            </Grid>
          {/* ))} */}
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
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui facere
            magnam non ducimus, explicabo nesciunt ipsa perspiciatis. Commodi
            possimus ab reprehenderit eaque soluta! Laudantium veritatis libero
            quaerat necessitatibus aliquam expedita veniam, ex eaque fugit
            voluptatum esse voluptates voluptas quo sequi rerum minus sed fuga,
            exercitationem ullam excepturi cupiditate impedit, eligendi quae?
            Sapiente aliquid dolor eum, magni tempore suscipit similique saepe
            ad quidem praesentium sit autem qui fuga obcaecati nam culpa
            aspernatur quaerat voluptatum, soluta, maxime amet eligendi.
            Reiciendis saepe, maiores voluptatem nihil, rem expedita adipisci
            beatae velit vel commodi voluptatibus hic non. Dolores culpa nobis
            delectus deserunt dolore accusantium tenetur!
          </Typography>
        </Box>
        <Box paddingX="32px" marginBottom="24px">
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
