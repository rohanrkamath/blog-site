// ** env variables
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
export const APP_VERSION = process.env.NEXT_PUBLIC_VERSION;
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const UPLOAD_PATH_URL = process.env.NEXT_PUBLIC_UPLOAD_PATH_URL;
export const REVALIDATE_SECRET = process.env.NEXT_PUBLIC_REVALIDATE_SECRET;
export const REVALIDATE_SECONDS =
  Number(process.env.NEXT_PUBLIC_REVALIDATE_HOURS) * 120;
export const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE;
export const SITE_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_DESCRIPTION;
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const PERSONAL_DESCRIPTION =
  process.env.NEXT_PUBLIC_PERSONAL_DESCRIPTION;
export const TWITTER_URL = process.env.NEXT_PUBLIC_PERSONAL_TWITTER_URL;
export const GITHUB_URL = process.env.NEXT_PUBLIC_PERSONAL_GITHUB_URL;
export const LINKEDIN_URL = process.env.NEXT_PUBLIC_PERSONAL_LINKEDIN_URL;
export const PERSONAL_EMAIL = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;
export const PAGE_SIZE = process.env.NEXT_PUBLIC_PAGE_SIZE
  ? Number(process.env.NEXT_PUBLIC_PAGE_SIZE)
  : 25;
export const NAVBAR_PAGE_IDS = process.env.NEXT_PUBLIC_NAVBAR_PAGE_IDS;

export const DEFAULT_ERR_MESSAGE =
  "An error occurred. Please try again later.";

export const ENDPOINT_URLS = {
  category: `api/category`,
  user: `api/user`,
  tag: `api/tag`,
  file: `api/file`,
  article: `api/article`,
  page: `api/page`,
  report: `api/report`,
};

// ** static variables
export const THEME_SETTINGS = {
  DRAWER_WITDH: 320,
};

export const QUERY_NAMES = {
  ARTICLE: "article",
  TAG: "tag",
  CATEGORY: "category",
  PAGE: "page",
  SETTINGS: "settings",
  FILES: "files",
  ADMIN_DASHBOARD_REPORT: "admin_dashboard_report",
  USER: "USER",
};

export const COOKIE_NAMES = {
  TOKEN: "token",
  THEME: "theme",
  ADMIN_NAVIGATION: "admin-navigation",
};
