"use client";

// ** react
import { Fragment } from "react";

// ** next
import { default as NextLink } from "next/link";
import { useRouter } from "next/navigation";

// ** mui
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

// ** icons
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

// ** components
import SearchInput from "@/components/SearchInput";

// ** models
import CategoryModel from "@/models/CategoryModel";
import PageModel from "@/models/PageModel";

// ** config
import {
  SITE_TITLE,
  PERSONAL_DESCRIPTION,
  TWITTER_URL,
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/config";

const Title = styled("h1")(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: "bold",
  textAlign: "center",
  padding: theme.spacing(2, 0),
  margin: 0,
  "& a": {
    display: "block",
    width: "100%",
    color: theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.primary.contrastText,
    textDecoration: "none",
    transition: 'opacity 0.2s ease',
    "&:hover": {
      opacity: 0.85,
      color: 'inherit'
    }
  },
}));

const Padding = styled("div")(({ theme }) => ({
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
}));

const StyledNav = styled("nav")(() => ({
  "& p": {
    textAlign: "center",
  },
}));

const ProfileSection = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingLeft: 5,
  paddingRight: 5,
  "&>*": {
    paddingBottom: "20px",
  },
}));

const AvatarContainer = styled("div")(({ theme }) => ({
  width: "240px",
  height: "240px",
  overflow: "hidden",
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[2]
}));

const Avatar = styled("img")(() => ({
  width: "100%",
  height: "100%",
  objectFit: "cover"
}));

const SocialMedia = styled("ul")(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  margin: 0,
  padding: 0,
  "& li": {
    listStyle: "none",
  },
}));

const CategoriesWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
}));

type NavigationContentProps = {
  categories: CategoryModel[];
  navbarPages: PageModel[];
};

export default function NavigationContent({
  categories,
  navbarPages,
}: NavigationContentProps) {
  const router = useRouter();

  return (
    <StyledNav>
      <ProfileSection>
        <Title>
          <Link component={NextLink} href="/" underline="none">
            {SITE_TITLE}
          </Link>
        </Title>

        <AvatarContainer>
          <Avatar src="/avatar.jpeg" alt={SITE_TITLE} />
        </AvatarContainer>
        <Typography 
          variant="h5" 
          component="p" 
          sx={{ 
            textAlign: 'center',
            fontSize: '1rem',
            fontWeight: 500,
            letterSpacing: '0.02em',
            lineHeight: 1.4,
            mt: 2,
            mb: 2
          }}
        >
          {PERSONAL_DESCRIPTION}
        </Typography>

        <SocialMedia>
          <li>
            <Link 
              href={TWITTER_URL || 'https://x.com/rohan__kamath'} 
              target="_blank" 
              rel="noopener noreferrer"
              component="a"
              onClick={(e) => {
                if (!TWITTER_URL) {
                  e.preventDefault();
                  window.open('https://x.com/rohan__kamath', '_blank');
                }
              }}
            >
              <Tooltip title="X (Twitter)">
                <XIcon color="action" />
              </Tooltip>
            </Link>
          </li>
          <li>
            <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <Tooltip title="Github">
                <GitHubIcon color="action" />
              </Tooltip>
            </Link>
          </li>
          <li>
            <Link href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              <Tooltip title="Linkedin">
                <LinkedInIcon color="action" />
              </Tooltip>
            </Link>
          </li>
        </SocialMedia>
      </ProfileSection>

      <Box padding={1} mb={1} mt={1}>
        <SearchInput size="small" fullWidth />
      </Box>

      <Divider />

      {navbarPages && (
        <Fragment>
          <List>
            {navbarPages.map((page) => (
              <ListItemButton
                key={page._id}
                LinkComponent={NextLink}
                href={`/${page.guid}`}
              >
                <ListItemText primary={page.title} />
              </ListItemButton>
            ))}
          </List>
        </Fragment>
      )}
      {categories.length > 0 && (
        <CategoriesWrapper>
          <Padding>
            <Typography
              component="span"
              fontSize="16px"
              textTransform="uppercase"
              fontWeight="bold"
            >
              Blog Categories
            </Typography>
          </Padding>

          <List>
            {categories.map((category) => (
              <ListItemButton
                key={category._id}
                LinkComponent={NextLink}
                href={`/category/${category.guid}`}
              >
                <ListItemText primary={category.title} />
              </ListItemButton>
            ))}
          </List>
        </CategoriesWrapper>
      )}
    </StyledNav>
  );
}
