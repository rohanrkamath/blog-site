"use client";

// ** react
import { useMemo } from "react";

// // ** third party
// import mediaQuery from "css-mediaquery";

// ** mui
import { createTheme } from "@mui/material/styles";
import { common, grey, blue } from "@mui/material/colors";
import { trTR } from "@mui/material/locale";

// ** models
import { PaletteMode } from "@/models/enums";

// ** overrides
import componentsOverride from "@/theme/overrides";

const Theme = (deviceType: string, mode: PaletteMode) => {
  const darkColor = "#1E1E1E";
  const sidebarColor = "#1A1A1A";

  // const ssrMatchMedia = (query: string) => ({
  //   matches: mediaQuery.match(query, {
  //     // The estimated CSS width of the browser.
  //     width: deviceType === "mobile" ? "0px" : "1024px",
  //   }),
  // });

  const theme = useMemo(
    () =>
      createTheme(
        {
          typography: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            h1: {
              fontSize: '1.5rem',
              fontWeight: 600,
              letterSpacing: '-0.022em',
            },
            h2: {
              fontSize: '1.1rem',
              fontWeight: 600,
              letterSpacing: '-0.021em',
            },
            h3: {
              fontSize: '1rem',
              fontWeight: 500,
              letterSpacing: '-0.02em',
            },
            body1: {
              fontSize: '0.85rem',
              lineHeight: 1.5,
              letterSpacing: '-0.011em',
            },
            body2: {
              fontSize: '0.75rem',
              lineHeight: 1.5,
              letterSpacing: '-0.01em',
            },
          },
          palette: {
            mode,
            ...(mode === PaletteMode.LIGHT
              ? {
                  primary: {
                    main: blue[600],
                    contrastText: common.white,
                  },
                  secondary: {
                    main: grey[700],
                    contrastText: common.white,
                  },
                  background: {
                    default: common.white,
                    paper: grey[50],
                  },
                  text: {
                    primary: grey[900],
                    secondary: grey[700],
                  },
                }
              : {
                  primary: {
                    main: blue[400],
                    contrastText: common.white,
                  },
                  secondary: {
                    main: common.white,
                    contrastText: grey[600],
                  },
                  background: {
                    default: "#282c34",
                    paper: "#32363f",
                  },
                  text: {
                    primary: "#FFFFFF",
                    secondary: "#9E9E9E",
                  },
                }),
          },
          components: {
            MuiTypography: {
              styleOverrides: {
                caption: {
                  color: mode === PaletteMode.LIGHT ? grey[900] : "#9E9E9E",
                },
              },
            },
          },
        },
        trTR
      ),
    [mode, deviceType]
  );

  theme.components = {
    ...theme.components,
    ...componentsOverride(theme),
  };
  return theme;
};

export default Theme;
