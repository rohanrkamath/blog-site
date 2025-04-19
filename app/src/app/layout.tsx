// ** react
import { ReactNode } from "react";

// ** next
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Noto_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

// ** third party
import { setDefaultOptions } from "date-fns/setDefaultOptions";
import { enUS } from "date-fns/locale";

// ** mui
import Box from "@mui/material/Box";

// ** theme
import Registry from "@/theme/Registry";

// ** models
import { PaletteMode } from "@/models/enums";

// ** utils
import fetchServerInterceptor from "@/utils/fetchServerInterceptor";
import generateFileUrl from "@/utils/GenerateFileUrl";

// ** config
import {
  REVALIDATE_SECONDS,
  APP_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
  COOKIE_NAMES,
  GA_ID,
} from "@/config";

// ** global styles
import "@/styles/global.scss";

setDefaultOptions({ locale: enUS });

const inter = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_TITLE}`,
    default: SITE_TITLE as string,
  },
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  authors: {
    name: SITE_TITLE,
    url: APP_URL,
  },
  metadataBase: new URL(APP_URL as string),
  alternates: {
    canonical: new URL(APP_URL as string),
    languages: {
      en: "/",
    },
  }
};

export default async function BlogLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  const cookieStore = cookies();
  const cookieGetTheme = cookieStore.get(COOKIE_NAMES.THEME);
  const cookieGetAdminNavigation = cookieStore.get(
    COOKIE_NAMES.ADMIN_NAVIGATION
  );

  const themeMode = !cookieGetTheme
    ? PaletteMode.LIGHT
    : (cookieGetTheme.value as PaletteMode);

  const adminNavigationOpen = cookieGetAdminNavigation?.value
    ? cookieGetAdminNavigation?.value === "true"
      ? true
      : false
    : true;

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <Registry
          themeMode={themeMode}
          adminNavigationOpen={adminNavigationOpen}
        >
          <Box
            display="flex"
            flexDirection={{
              md: "row",
              xs: "column",
            }}
          >
            {children}
          </Box>
        </Registry>
      </body>
      <GoogleAnalytics gaId={GA_ID as string} />
    </html>
  );
}

export const revalidate = REVALIDATE_SECONDS;
