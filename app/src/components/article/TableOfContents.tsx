"use client";

// ** react
import { useEffect, useState } from "react";

// ** mui
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const TableOfContentsWrapper = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: theme.spacing(2),
  maxHeight: 'calc(100vh - 100px)',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.background.paper,
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.divider,
    borderRadius: '4px',
  },
}));

type Heading = {
  id: string;
  text: string;
  level: number;
};

type TableOfContentsProps = {
  content: string;
};

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from markdown content
    const extractHeadings = () => {
      const headingRegex = /^(#{1,6})\s+(.+)$/gm;
      const matches = Array.from(content.matchAll(headingRegex));
      
      return matches.map((match, index) => ({
        id: `heading-${index}`,
        text: match[2],
        level: match[1].length,
      }));
    };

    setHeadings(extractHeadings());

    // Add IDs to the actual headings in the document
    const article = document.querySelector('article');
    if (article) {
      const headingElements = article.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headingElements.forEach((el, index) => {
        el.id = `heading-${index}`;
      });
    }
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      
      for (const element of headingElements) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
          setActiveId(element.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (headings.length === 0) return null;

  return (
    <TableOfContentsWrapper>
      <Typography variant="h6" gutterBottom>
        Table of Contents
      </Typography>
      <List dense disablePadding>
        {headings.map((heading) => (
          <ListItem 
            key={heading.id}
            disablePadding
            sx={{ 
              pl: (heading.level - 1) * 2,
            }}
          >
            <ListItemButton
              onClick={() => handleClick(heading.id)}
              selected={activeId === heading.id}
              sx={{
                borderRadius: 1,
                '&.Mui-selected': {
                  backgroundColor: 'action.selected',
                },
              }}
            >
              <ListItemText 
                primary={heading.text}
                primaryTypographyProps={{
                  variant: 'body2',
                  sx: { 
                    fontWeight: activeId === heading.id ? 'bold' : 'normal',
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </TableOfContentsWrapper>
  );
} 