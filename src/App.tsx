import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PatientDetail from "./components/PatientDetail";
import PatientList from "./components/PatientList";
import { NotificationProvider } from "./context/NotificationContext";
import { theme } from "./theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <CssBaseline />
        <Router>
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              bgcolor: "background.default",
            }}
          >
            <Container
              maxWidth="xl"
              sx={{
                py: 3,
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{ mb: 3, color: "primary.main" }}
              >
                Radiology Patient Interface
              </Typography>
              <Box sx={{ flexGrow: 1, minHeight: 0 }}>
                <Routes>
                  <Route path="/" element={<PatientList />} />
                  <Route path="/patient/:id" element={<PatientDetail />} />
                </Routes>
              </Box>
            </Container>
          </Box>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
