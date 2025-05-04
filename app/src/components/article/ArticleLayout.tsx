"use client";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const ArticleContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 300px',
  gap: theme.spacing(8),
  maxWidth: '1200px',
  margin: '0 auto',
  padding: theme.spacing(0, 2),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

type ArticleLayoutProps = {
  children: React.ReactNode;
  tableOfContents: React.ReactNode;
};

export default function ArticleLayout({ children, tableOfContents }: ArticleLayoutProps) {
  return (
    <ArticleContainer>
      {children}
      <Box sx={{ 
        display: { xs: 'none', md: 'block' },
        position: 'sticky',
        top: '64px',
        alignSelf: 'start',
        paddingLeft: theme => theme.spacing(2)
      }}>
        {tableOfContents}
      </Box>
    </ArticleContainer>
  );
} 