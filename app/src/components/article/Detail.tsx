// ** next
import { default as NextLink } from "next/link";
import Link from "next/link";

// ** third party
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import readingTime from "reading-time";
import { useEffect, useState } from "react";

// ** mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

// ** models
import ArticleModel from "@/models/ArticleModel";

// ** components
import RenderMdx from "@/components/RenderMdx";
import TableOfContents from "@/components/article/TableOfContents";
import ArticleLayout from "@/components/article/ArticleLayout";
import NextRecommendedRead from "@/components/article/NextRecommendedRead";

// ** utils
import generateFileUrl from "@/utils/GenerateFileUrl";
import ArticleService from "@/services/ArticleService";

type ArticleDetailProps = {
  data: ArticleModel;
};

export default async function ArticleDetail({ data }: ArticleDetailProps) {
  const readingTimeMin = Math.round(readingTime(data.content).minutes);

  // Remove the H1 title from content since we're displaying it separately
  const contentWithoutTitle = data.content.replace(/^#\s+.*$/m, '');

  // Server-side fetch for next article
  let nextArticleData = null;
  if (data.nextArticle) {
    if (typeof data.nextArticle === "object") {
      nextArticleData = data.nextArticle;
    } else {
      const res = await ArticleService.getItemById(data.nextArticle);
      nextArticleData = res?.data ?? null;
    }
  }

  return (
    <ArticleLayout
      tableOfContents={<TableOfContents content={contentWithoutTitle} />}
    >
      <Box component="article">
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Typography
                component="h1"
                variant="h3"
                sx={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  mb: 2,
                  color: "text.primary"
                }}
              >
                {data.title}
              </Typography>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={1}
                sx={{
                  "& span.MuiBox-root": {
                    fontSize: "0.770rem",
                    color: "grey.600",
                  },
                }}
              >
                <Box component="span">
                  {formatDistanceToNow(new Date(data.publishingDate), {
                    addSuffix: true,
                    locale: enUS
                  })}
                </Box>
                <Box component="span">
                  {readingTimeMin <= 0
                    ? "Less than 1 minute"
                    : `${readingTimeMin} minute read`}
                </Box>
                <Box component="span">{`${data.viewCount} views`}</Box>
              </Stack>
            </Grid>
          </Grid>

          <Grid item xs={12} width="100%">
            <RenderMdx content={contentWithoutTitle} />
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {data.tags.map((tag) => (
                <Chip
                  key={tag._id}
                  label={tag.title}
                  component={NextLink}
                  href={`/tag/${tag.guid}`}
                  variant="outlined"
                  size="small"
                  clickable
                />
              ))}
            </Stack>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <NextRecommendedRead nextArticle={nextArticleData} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ArticleLayout>
  );
}
