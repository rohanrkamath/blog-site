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
  top: '64px',
  maxHeight: 'calc(100vh - 96px)',
  overflowY: 'auto',
  paddingLeft: theme.spacing(2),
  borderLeft: `2px solid ${theme.palette.divider}`,
  zIndex: 1,
  marginTop: theme.spacing(6),
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
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '2px',
    background: theme.palette.primary.main,
    opacity: 0.3,
  }
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

      // Select h2, h3, and h4 headings
      const headingElements = mdxContent.querySelectorAll('h2, h3, h4');
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

      // Build hierarchy (h2 -> h3 -> h4)
      const root: Heading[] = [];
      let currentH2: Heading | null = null;
      let currentH3: Heading | null = null;

      flatHeadings.forEach((heading) => {
        if (heading.level === 2) {
          currentH2 = heading;
          currentH3 = null;
          root.push(heading);
        } else if (heading.level === 3 && currentH2) {
          currentH3 = heading;
          currentH2.children.push(heading);
        } else if (heading.level === 4 && currentH3) {
          currentH3.children.push(heading);
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
      
      for (const element of headingElements) {
        const rect = element.getBoundingClientRect();
        if (rect.top - 80 <= 0) {
          currentActiveId = element.id;
        } else {
          break;
        }
      }
      
      // Handle case when we're at the bottom of the page
      if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 50) {
        const lastVisible = headingElements.filter(element => {
          const rect = element.getBoundingClientRect();
          return rect.top <= window.innerHeight;
        }).pop();
        if (lastVisible) {
          currentActiveId = lastVisible.id;
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
    const hasChildren = heading.children.length > 0;

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
              const el = document.getElementById(heading.id);
              if (el) {
                const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            sx={{
              display: 'block',
              pl: 2,
              py: 1,
              color: isActive ? 'primary.main' : 'text.primary',
              fontWeight: isActive ? 500 : 400,
              fontSize: '0.85rem',
              transition: 'all 0.2s ease',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            {heading.text}
          </Link>
        </Box>
        {hasChildren && (
          <Collapse in={isSectionActive}>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {heading.children.map(child => (
                <Box key={child.id}>
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
                        const el = document.getElementById(child.id);
                        if (el) {
                          const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }}
                      sx={{
                        display: 'block',
                        pl: 4,
                        py: 1,
                        color: child.id === activeId ? 'primary.main' : 'text.secondary',
                        fontWeight: child.id === activeId ? 500 : 400,
                        fontSize: '0.8rem',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      {child.text}
                    </Link>
                  </Box>
                  {child.children.length > 0 && (
                    <Collapse in={child.id === activeId || child.children.some(h4 => h4.id === activeId)}>
                      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                        {child.children.map(h4Child => (
                          <Box
                            key={h4Child.id}
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
                                bgcolor: h4Child.id === activeId ? 'primary.main' : 'transparent',
                                borderRadius: '0 4px 4px 0',
                              },
                            }}
                          >
                            <Link
                              href={`#${h4Child.id}`}
                              underline="none"
                              onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById(h4Child.id);
                                if (el) {
                                  const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
                                  window.scrollTo({ top: y, behavior: 'smooth' });
                                }
                              }}
                              sx={{
                                display: 'block',
                                pl: 6,
                                py: 1,
                                color: h4Child.id === activeId ? 'primary.main' : 'text.secondary',
                                fontWeight: h4Child.id === activeId ? 500 : 400,
                                fontSize: '0.75rem',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  color: 'primary.main',
                                },
                              }}
                            >
                              {h4Child.text}
                            </Link>
                          </Box>
                        ))}
                      </Box>
                    </Collapse>
                  )}
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
          fontSize: '0.95rem',
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