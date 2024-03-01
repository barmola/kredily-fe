import PropTypes from "prop-types";
import { m } from "framer-motion";
// @mui
import { Container, Typography } from "@mui/material";
// components
import { MotionContainer, varBounce } from "../components/animate";
// assets
import { useAuthContext } from "./useAuthContext";

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  children: PropTypes.node,
  hasContent: PropTypes.bool,
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default function RoleBasedGuard({ hasContent, roles, children }) {
  // Logic here to get current user role
  const { user } = useAuthContext();

  // const currentRole = 'user';
  const currentRole = user?.role; // admin;

  if (typeof roles !== "undefined" && !roles.includes(currentRole)) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: "center" }}>
        <m.div variants={varBounce().in}>
          <Typography variant='h3' paragraph>
            Permission Denied
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: "text.secondary" }}>You do not have permission to access this page</Typography>
        </m.div>
      </Container>
    ) : null;
  }

  return <> {children} </>;
}
