"use client";

import { Fragment } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CoffeeIcon from '@mui/icons-material/Coffee';

export default function BuyMeCoffeePage() {
  return (
    <Fragment>
      <Paper elevation={1} sx={{ p: 3, mb: 3, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Buy Me a Coffee
        </Typography>
        <Typography variant="body1" paragraph>
          If you find my work helpful or enjoy my content, consider buying me a coffee! Your support helps me continue creating and sharing.
        </Typography>
        <Box sx={{ mt: 4, mb: 2 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<CoffeeIcon />}
            href="https://www.buymeacoffee.com/rohankamath"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              backgroundColor: '#FFDD00',
              color: '#000000',
              '&:hover': {
                backgroundColor: '#E5C700',
              }
            }}
          >
            Buy me a coffee
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          Thank you for your support! 🙏
        </Typography>
      </Paper>
    </Fragment>
  );
} 