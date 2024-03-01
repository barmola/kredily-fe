import { Link as RouterLink, useLocation } from "react-router-dom";
// @mui
import { Box, Grid, Link, Stack, Divider, Container, Typography, IconButton } from "@mui/material";
// routes
import { PATH_PAGE } from "../../routes/paths";
// components
import Logo from "../../components/logo";
import Iconify from "../../components/iconify";

// ----------------------------------------------------------------------

export default function Footer() {
  const { pathname } = useLocation();

  const isHome = pathname === "/";

  const simpleFooter = (
    <Box
      component='footer'
      sx={{
        py: 5,
        textAlign: "center",
        position: "relative",
        bgcolor: "background.default",
      }}
    >
      <Container>
        <Logo sx={{ mb: 1, mx: "auto" }} />

        <Typography variant='caption' component='div'>
          © All rights reserved
          <br /> made by &nbsp;
          <Link href='https://minimals.cc/'> minimals.cc </Link>
        </Typography>
      </Container>
    </Box>
  );

  const mainFooter = (
    <Box
      component='footer'
      sx={{
        position: "relative",
        bgcolor: "background.default",
      }}
    >
      <Divider />

      <Container sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{
            xs: "center",
            md: "space-between",
          }}
          sx={{
            textAlign: {
              xs: "center",
              md: "left",
            },
          }}
        >
          <Grid item xs={12} sx={{ mb: 3 }}>
            <Logo sx={{ mx: { xs: "auto", md: "inherit" } }} />
          </Grid>

          <Grid item xs={8} md={3}>
            <Typography variant='body2' sx={{ pr: { md: 5 } }}>
              The starting point for your next project with Kredily HRMS, built on the newest version of Material-UI ©, ready to be customized to your
              style.
            </Typography>
          </Grid>

          <Grid item xs={12} md={7}></Grid>
        </Grid>

        <Typography
          variant='caption'
          component='div'
          sx={{
            mt: 10,
            pb: 5,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          © 2021. All rights reserved
        </Typography>
      </Container>
    </Box>
  );

  return isHome ? simpleFooter : mainFooter;
}
