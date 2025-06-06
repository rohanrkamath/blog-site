"use client";

import { Fragment } from "react";
import { AppBar, Toolbar, Button, Box, IconButton, Tooltip } from '@mui/material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import DarkModeToggle from "@/components/DarkModeToggle";
import LoginIcon from '@mui/icons-material/Login';

const navigationItems = [
  { label: 'About', href: '/about-me' },
  { label: 'Buy Me Coffee', href: '/buy-me-coffee' },
];

export default function TopNavBar() {
  const pathname = usePathname();

  return (
    <AppBar 
      position="sticky" 
      color="transparent" 
      elevation={0}
      sx={{ 
        borderBottom: '1px solid',
        borderColor: 'divider',
        backdropFilter: 'blur(8px)',
        backgroundColor: 'background.default',
        minHeight: '56px',
      }}
    >
      <Toolbar sx={{ minHeight: '48px !important', height: '48px !important' }}>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {navigationItems.map((item) => (
            <Button
              key={item.href}
              component={Link}
              href={item.href}
              sx={{
                color: 'text.primary',
                fontWeight: pathname === item.href ? 600 : 400,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
          <Tooltip title="Admin Login">
            <IconButton
              component={Link}
              href="/admin"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <LoginIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <DarkModeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
} 