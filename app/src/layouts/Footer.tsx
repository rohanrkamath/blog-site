"use client";

// ** config
import { APP_VERSION } from "@/config";

// ** mui
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const StyledFooter = styled("footer")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "12px 0px",
  position: "relative",
  bottom: 0,
  '& .MuiTypography-root': {
    transition: 'opacity 0.2s ease',
    fontSize: '0.65rem',
    opacity: 0.6,
    cursor: 'default',
    '&:hover': {
      opacity: 0.85
    }
  }
}));

export default function Footer() {
  return (
    <StyledFooter>
      <Container maxWidth={false} sx={{ textAlign: 'center' }}>
        <Typography 
          variant="caption" 
          display="block" 
          color="text.secondary"
        >
          © 2025 Rohan Kamath
        </Typography>
      </Container>
    </StyledFooter>
  );
}
