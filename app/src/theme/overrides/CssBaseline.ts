"use client";

import { Components, Theme } from "@mui/material/styles";
import darkScrollbar from "@mui/material/darkScrollbar";

export default function CssBaseline(
  theme: Theme
): Components<Omit<Theme, "components">> {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          ...(theme.palette.mode === "dark" ? darkScrollbar() : null),
          transition: "all 0.3s linear",
        },
        // body: {
        //   backgroundColor: `${
        //     theme.palette.mode === "dark"
        //       ? theme.palette.common.black
        //       : theme.palette.common.white
        //   } !important`,
        // },
        //body: theme.palette.mode === "dark" ? darkScrollbar() : null,
        ".editor-heading-h1": {
          fontSize: "24px",
          color:
            theme.palette.mode === "dark"
              ? theme.palette.common.white
              : theme.palette.common.black,
        },
        ".editor-heading-h2": {
          fontSize: "15px",
          color:
            theme.palette.mode === "dark"
              ? theme.palette.common.white
              : theme.palette.common.black,
          fontWeight: 700,
          margin: 0,
          marginTop: "10px",
          padding: 0,
          textTransform: "uppercase",
        },
        ".editor-code, pre, code": {
          backgroundColor:
            theme.palette.mode === "dark"
              ? "#23272e"
              : theme.palette.grey[100],
          fontFamily: "Menlo, Consolas, Monaco, monospace",
          display: "block",
          padding: "12px",
          lineHeight: 1.53,
          fontSize: "13px",
          margin: 0,
          marginTop: "8px",
          marginBottom: "8px",
          tabSize: 2,
          overflowX: "auto",
          position: "relative",
        },
        ".editor-quote": {
          margin: "0",
          marginLeft: "20px",
          fontSize: "15px",
          color: "rgb(101, 103, 107)",
          borderLeftColor: "rgb(206, 208, 212)",
          borderLeftWidth: "4px",
          borderLeftStyle: "solid",
          paddingLeft: "16px",
        },
        ".editor-list-ol": { padding: "0", margin: "0", marginLeft: "16px" },
        ".editor-list-ul": { padding: "0", margin: "0", marginLeft: "16px" },
        ".editor-listitem": { margin: "8px 32px 8px 32px" },
        ".editor-nested-listitem": { listStyleType: "none" },
      },
    },
  };
}
