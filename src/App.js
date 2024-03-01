// i18n
import "./locales/i18n";
import "simplebar/src/simplebar.css";

// scroll bar
// lazy image
import "react-lazy-load-image-component/src/effects/blur.css";

// ----------------------------------------------------------------------

import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// @mui
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// locales
import ThemeLocalization from "./locales";
// components
import SnackbarProvider from "./components/snackbar";
import { MotionLazyContainer } from "./components/animate";
import { ThemeSettings, SettingsProvider } from "./components/settings";

import { AuthProvider } from "./auth/FirebaseContext";
import { SnackbarUtilsConfigurator } from "./utils/snackbar";
import { LeaveProvider } from "./context/LeaveContext";
// import { AuthProvider } from './auth/Auth0Context';
// import { AuthProvider } from './auth/FirebaseContext';
// import { AuthProvider } from './auth/AwsCognitoContext';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <AuthProvider>
      <LeaveProvider>
        <HelmetProvider>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <SettingsProvider>
              <BrowserRouter>
                <MotionLazyContainer>
                  <ThemeProvider>
                    <ThemeSettings>
                      <ThemeLocalization>
                        <SnackbarProvider>
                          <SnackbarUtilsConfigurator />
                          <Router />
                        </SnackbarProvider>
                      </ThemeLocalization>
                    </ThemeSettings>
                  </ThemeProvider>
                </MotionLazyContainer>
              </BrowserRouter>
            </SettingsProvider>
          </LocalizationProvider>
        </HelmetProvider>
      </LeaveProvider>
    </AuthProvider>
  );
}
