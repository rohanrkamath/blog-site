"use client";

// ** react
import { useEffect, useState } from "react";

// ** mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Collapse from "@mui/material/Collapse";

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

interface Heading {
  id: string;
  text: string;
  level: number;
  children: Heading[];
}

type TableOfContentsProps = {
  content: string;
};

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const extractHeadings = () => {
      const mdxContent = document.querySelector('.mdx-content');
      if (!mdxContent) return [];

      // Only select h2 and h3 headings
      const headingElements = mdxContent.querySelectorAll('h2, h3');
      const seenTexts = new Set<string>();
      const flatHeadings: Heading[] = Array.from(headingElements)
        .filter(el => {
          const text = el.textContent?.trim() || '';
          if (!text || seenTexts.has(text)) return false;
          seenTexts.add(text);
          return true;
        })
        .map((el, index) => {
          if (!el.id) {
            el.id = `heading-${index}`;
          }
          return {
            id: el.id,
            text: el.textContent?.trim() || '',
            level: parseInt(el.tagName[1]),
            children: [],
          };
        });

      // Build hierarchy (only h2 and h3)
      const root: Heading[] = [];
      let currentH2: Heading | null = null;

      flatHeadings.forEach((heading) => {
        if (heading.level === 2) {
          currentH2 = heading;
          root.push(heading);
        } else if (heading.level === 3 && currentH2) {
          currentH2.children.push(heading);
        }
      });

      return root;
    };

    setTimeout(() => {
      const headingsList = extractHeadings();
      setHeadings(headingsList);

      // Set initial active heading
      const mdxContent = document.querySelector('.mdx-content');
      if (mdxContent) {
        const headingElements = Array.from(mdxContent.querySelectorAll('h2, h3'));
        for (const element of headingElements) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setActiveId(element.id);
            break;
          }
        }
      }
    }, 100);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const mdxContent = document.querySelector('.mdx-content');
      if (!mdxContent) return;

      const headingElements = Array.from(mdxContent.querySelectorAll('h2, h3'));
      let currentActiveId = "";
      
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        const rect = element.getBoundingClientRect();
        
        if (rect.top <= window.innerHeight / 3) {
          currentActiveId = element.id;
          break;
        }
      }
      
      if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 50) {
        const visibleHeadings = headingElements.filter(element => {
          const rect = element.getBoundingClientRect();
          return rect.top <= window.innerHeight;
        });
        if (visibleHeadings.length > 0) {
          currentActiveId = visibleHeadings[visibleHeadings.length - 1].id;
        }
      }

      if (currentActiveId !== activeId) {
        setActiveId(currentActiveId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeId]);

  const isActiveSection = (heading: Heading): boolean => {
    if (activeId === heading.id) return true;
    return heading.children.some(child => child.id === activeId);
  };

  const renderHeading = (heading: Heading) => {
    const isActive = activeId === heading.id;
    const isSectionActive = isActiveSection(heading);
    const hasH3Children = heading.children.length > 0;

    return (
      <Box key={heading.id}>
        <Box
          component="li"
          sx={{
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '3px',
              bgcolor: isActive ? 'primary.main' : 'transparent',
              borderRadius: '0 4px 4px 0',
            },
          }}
        >
          <Link
            href={`#${heading.id}`}
            underline="none"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({
                behavior: 'smooth'
              });
            }}
            sx={{
              display: 'block',
              pl: 2,
              py: 1,
              color: isActive ? 'primary.main' : 'text.primary',
              fontWeight: isActive ? 500 : 400,
              fontSize: '0.95rem',
              transition: 'all 0.2s ease',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            {heading.text}
          </Link>
        </Box>
        {hasH3Children && (
          <Collapse in={isSectionActive}>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {heading.children.map(child => (
                <Box
                  key={child.id}
                  component="li"
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '3px',
                      bgcolor: child.id === activeId ? 'primary.main' : 'transparent',
                      borderRadius: '0 4px 4px 0',
                    },
                  }}
                >
                  <Link
                    href={`#${child.id}`}
                    underline="none"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(child.id)?.scrollIntoView({
                        behavior: 'smooth'
                      });
                    }}
                    sx={{
                      display: 'block',
                      pl: 4,
                      py: 1,
                      color: child.id === activeId ? 'primary.main' : 'text.secondary',
                      fontWeight: child.id === activeId ? 500 : 400,
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {child.text}
                  </Link>
                </Box>
              ))}
            </Box>
          </Collapse>
        )}
      </Box>
    );
  };

  if (headings.length === 0) return null;

  return (
    <TableOfContentsWrapper>
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          fontWeight: 700, 
          mb: 3,
          fontSize: '1.1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}
      >
        Table of Contents
      </Typography>
      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
        {headings.map(heading => renderHeading(heading))}
      </Box>
    </TableOfContentsWrapper>
  );
} 