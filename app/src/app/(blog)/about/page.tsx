"use client";

import { Fragment } from "react";
import { Typography, Paper, Box, Grid } from "@mui/material";
import TableOfContents from "@/components/TableOfContents";

export default function AboutPage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 4 }}>
          <Typography id="about-me" variant="h4" component="h1" gutterBottom>
            About Me
          </Typography>
          <Typography paragraph>
            Hi, I'm Rohan Kamath, a passionate software engineer with a love for building innovative solutions and sharing knowledge with the developer community.
          </Typography>

          <Typography id="journey" variant="h5" gutterBottom sx={{ mt: 4 }}>
            My Journey
          </Typography>
          <Typography paragraph>
            I've been fascinated by technology since my early years, which led me to pursue a career in software engineering. Throughout my journey, I've worked with various technologies and frameworks, always striving to learn and grow.
          </Typography>

          <Typography id="what-i-do" variant="h5" gutterBottom sx={{ mt: 4 }}>
            What I Do
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li">💻 Full-Stack Development</Typography>
            <Typography component="li">🌐 Web Applications</Typography>
            <Typography component="li">📱 Mobile Development</Typography>
            <Typography component="li">🚀 Cloud Architecture</Typography>
            <Typography component="li">🔒 Security Best Practices</Typography>
          </Box>

          <Typography id="skills" variant="h5" gutterBottom sx={{ mt: 4 }}>
            Skills & Technologies
          </Typography>
          <Typography paragraph>
            I specialize in modern web technologies and cloud solutions, with expertise in:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li">• JavaScript/TypeScript, React, Next.js</Typography>
            <Typography component="li">• Node.js, Express, NestJS</Typography>
            <Typography component="li">• AWS, Docker, Kubernetes</Typography>
            <Typography component="li">• MongoDB, PostgreSQL</Typography>
            <Typography component="li">• CI/CD, DevOps practices</Typography>
          </Box>

          <Typography id="interests" variant="h5" gutterBottom sx={{ mt: 4 }}>
            Interests & Hobbies
          </Typography>
          <Typography paragraph>
            Beyond coding, I'm passionate about:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li">📚 Reading tech blogs and books</Typography>
            <Typography component="li">✍️ Writing technical articles</Typography>
            <Typography component="li">🎮 Gaming</Typography>
            <Typography component="li">🎵 Music</Typography>
          </Box>

          <Typography id="connect" variant="h5" gutterBottom sx={{ mt: 4 }}>
            Let's Connect
          </Typography>
          <Typography paragraph>
            I'm always interested in connecting with fellow developers and tech enthusiasts. Feel free to reach out through any of my social media channels or drop me an email.
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <TableOfContents />
      </Grid>
    </Grid>
  );
} 