"use client";

import { Fragment } from "react";
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import DarkModeToggle from "@/components/DarkModeToggle";

const navigationItems = [
  { label: 'About', href: '/about' },
  { label: 'Buy Me Coffee', href: '/buy-me-coffee' },
];

export default function TopNavBar() {
  const pathname = usePathname();

  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={0}
      sx={{ 
        borderBottom: '1px solid',
        borderColor: 'divider',
        mb: 2
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', gap: 2 }}>
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
          <DarkModeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
} 