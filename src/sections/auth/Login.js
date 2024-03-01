import { Link as RouterLink } from "react-router-dom";
// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from "@mui/material";
// auth
import { useAuthContext } from "../../auth/useAuthContext";
// routes
import { PATH_AUTH } from "../../routes/paths";
// layouts
import LoginLayout from "../../layouts/login";
//
import AuthLoginForm from "./AuthLoginForm";

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuthContext();

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant='h4'>Login to Kredily</Typography>

        <Stack direction='row' spacing={0.5}>
          <Typography variant='body2'>New user?</Typography>

          <Link component={RouterLink} to={PATH_AUTH.register} variant='subtitle2'>
            Create an account
          </Link>
        </Stack>
      </Stack>

      <Alert severity='info' sx={{ mb: 3 }}>
        HR : <strong>hr@kredily.com</strong> / password :<strong> Kredily12@</strong> <br />
        Manager : <strong>manager@kredily.com</strong> / password :<strong> Qilin12@</strong>
        <br />
        EMP : <strong>jrbarmola@gmail.com</strong> / password :<strong> Qilin12@</strong>
        EMP : <strong>emp@kredily.com</strong> / password :<strong> Qilin12@</strong>
      </Alert>

      <AuthLoginForm />
    </LoginLayout>
  );
}
