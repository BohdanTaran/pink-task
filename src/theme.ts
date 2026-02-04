import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1a237e",
      light: "#534bae",
      dark: "#000051",
    },
    background: {
      default: "#f5f7f9",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a237e",
      secondary: "#5c6bc0",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h4: {
          fontWeight: 700,
        },
      },
    },
  },
});
