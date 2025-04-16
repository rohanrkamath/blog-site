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
  const darkColor = "#202020";

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
          palette: {
            mode,
            ...(mode === PaletteMode.LIGHT
              ? {
                  primary: {
                    main: blue[700],
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
                    main: darkColor,
                    contrastText: common.white,
                  },
                  secondary: {
                    main: common.white,
                    contrastText: grey[600],
                  },
                  background: {
                    default: darkColor,
                    paper: grey[900],
                  },
                  text: {
                    primary: common.white,
                    secondary: grey[400],
                  },
                }),
          },
          components: {
            MuiTypography: {
              styleOverrides: {
                caption: {
                  color: mode === PaletteMode.LIGHT ? grey[900] : common.white,
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
