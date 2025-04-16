"use client";

// ** react
import { Fragment } from "react";

// ** next
import { default as NextLink } from "next/link";
import Image from "next/image";
import { Metadata } from "next";

// ** mui
import { default as MaterialLink } from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// ** components
import SearchInput from "@/components/SearchInput";

export const metadata: Metadata = {
  title: "404 Page Not Found",
  robots: {
    follow: false,
    index: false,
  },
};

export default function NotFoundPage() {
  return (
    <Fragment>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignContent="center"
        spacing={3}
      >
        <Grid item>
          <Typography align="center" variant="h1" letterSpacing={10}>
            404
          </Typography>
        </Grid>

        <Grid item display="flex" justifyContent="center">
          <Image
            src="/images/i-dont-know.gif"
            width={220}
            height={220}
            alt="I don't know xd"
          />
        </Grid>

        <Grid item>
          <Typography align="center" variant="body2" component="span">
            <MaterialLink component={NextLink} href="/" color="secondary">
              Click here
            </MaterialLink>{" "}
            to return to the homepage or search below.
          </Typography>
        </Grid>

        <Grid item>
          <SearchInput fullWidth />
        </Grid>
      </Grid>
    </Fragment>
  );
}
