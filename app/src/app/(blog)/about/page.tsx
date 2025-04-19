"use client";

import { Fragment } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export default function AboutPage() {
  return (
    <Fragment>
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About Me
        </Typography>
        <Typography variant="body1" paragraph>
          Hi, I'm Rohan Kamath, a passionate software engineer with a love for building innovative solutions and sharing knowledge with the developer community.
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          My Journey
        </Typography>
        <Typography variant="body1" paragraph>
          I've been fascinated by technology since my early years, which led me to pursue a career in software engineering. Throughout my journey, I've worked with various technologies and frameworks, always striving to learn and grow.
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          What I Do
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          <Typography component="li">💻 Full-Stack Development</Typography>
          <Typography component="li">🌐 Web Applications</Typography>
          <Typography component="li">📱 Mobile Development</Typography>
          <Typography component="li">🚀 Cloud Architecture</Typography>
          <Typography component="li">🔒 Security Best Practices</Typography>
        </Box>
      </Paper>
    </Fragment>
  );
} 