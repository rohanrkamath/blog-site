"use client";

import { useEffect, useState } from 'react';
import { Box, Typography, Link } from '@mui/material';

interface Section {
  id: string;
  title: string;
  level: number;
}

const sections: Section[] = [
  { id: 'about-me', title: 'About Me', level: 0 },
  { id: 'journey', title: 'My Journey', level: 0 },
  { id: 'what-i-do', title: 'What I Do', level: 0 },
  { id: 'skills', title: 'Skills & Technologies', level: 0 },
  { id: 'interests', title: 'Interests & Hobbies', level: 0 },
  { id: 'connect', title: 'Let\'s Connect', level: 0 }
];

export default function TableOfContents() {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50px 0px -50% 0px',
        threshold: 0
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      component="nav"
      sx={{
        position: 'sticky',
        top: 24,
        maxHeight: 'calc(100vh - 48px)',
        overflowY: 'auto',
        p: 2,
        borderRadius: 1,
        bgcolor: 'background.paper',
        boxShadow: 1,
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        CONTENTS
      </Typography>
      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
        {sections.map(({ id, title, level }) => (
          <Box
            component="li"
            key={id}
            sx={{
              pl: level * 2,
              mb: 2,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '3px',
                bgcolor: activeSection === id ? 'primary.main' : 'transparent',
                borderRadius: '0 4px 4px 0',
              },
            }}
          >
            <Link
              href={`#${id}`}
              underline="none"
              sx={{
                display: 'block',
                pl: 2,
                color: activeSection === id ? 'primary.main' : 'text.primary',
                fontWeight: activeSection === id ? 500 : 400,
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
            >
              {title}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
} 