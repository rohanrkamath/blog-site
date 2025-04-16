"use client";

// ** config
import { APP_VERSION } from "@/config";

// ** mui
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const StyledFooter = styled("footer")(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "25px 0px",
  position: "relative",
  bottom: 0
}));

export default function Footer() {
  return (
    <StyledFooter>
      <Container maxWidth={false} sx={{ textAlign: 'center' }}>
        <Typography variant="caption" display="block" color="grey">
          © 2025 Rohan Kamath
        </Typography>
      </Container>
    </StyledFooter>
  );
}
