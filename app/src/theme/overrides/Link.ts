"use client";

import { Components, Theme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

export default function Link(
  theme: Theme
): Components<Omit<Theme, "components">> {
  return {
    MuiLink: {
      styleOverrides: {
        root: {
          color: theme.palette.mode === 'dark' ? blue[400] : blue[500],
        },
      },
    },
  };
}
