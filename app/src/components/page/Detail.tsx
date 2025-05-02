// ** third party
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

// ** mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// ** models
import PageModel from "@/models/PageModel";

// ** components
import RenderMdx from "@/components/RenderMdx";
import ArticleLayout from "@/components/article/ArticleLayout";
import TableOfContents from "@/components/article/TableOfContents";

type PageDetailProps = {
  data: PageModel;
};

export default function PageDetail({ data }: PageDetailProps) {
  // Remove the H1 title from content since we're displaying it separately
  const contentWithoutTitle = data.content.replace(/^#\s+.*$/m, '');

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
                <Box component="span">{`${data.viewCount} views`}</Box>
              </Stack>
            </Grid>
          </Grid>

          <Grid item xs={12} width="100%">
            <RenderMdx content={contentWithoutTitle} />
          </Grid>
        </Grid>
      </Box>
    </ArticleLayout>
  );
}
