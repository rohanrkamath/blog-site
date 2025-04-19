"use client";

import { Fragment } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { usePathname } from "next/navigation";
import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Buy Me Coffee", href: "/buy-me-coffee" },
];

export default function TopNavBar() {
  const pathname = usePathname();

  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={0}
      sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        backgroundColor: 'background.paper'
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', gap: 2, ml: 'auto', alignItems: 'center' }}>
          {navItems.map((item) => (
            <Button
              key={item.href}
              component={Link}
              href={item.href}
              color={pathname === item.href ? "primary" : "inherit"}
              sx={{ 
                textTransform: 'none',
                fontWeight: pathname === item.href ? 700 : 400
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