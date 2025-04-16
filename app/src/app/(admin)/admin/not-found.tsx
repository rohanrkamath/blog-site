"use client";

// ** react
import { Fragment } from "react";

// ** next
import { default as NextLink } from "next/link";
import { Metadata } from "next";

// ** mui
import { default as MaterialLink } from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

// ** components
import SearchInput from "@/components/SearchInput";

export const metadata: Metadata = {
  title: "404 Page Not Found",
  robots: {
    follow: false,
    index: false,
  },
};

export default function AdminNotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      p={2}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Page Not Found 😔
      </Typography>
      <Typography variant="body1" gutterBottom>
        You can return to the homepage by clicking{" "}
        <Link href="/admin" component={NextLink}>
          here
        </Link>{" "}
        or use the search below.
      </Typography>
    </Box>
  );
}
