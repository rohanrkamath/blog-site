"use client";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ArticleModel from "@/models/ArticleModel";

export default function NextRecommendedRead({ nextArticle }: { nextArticle: ArticleModel | null }) {
  if (!nextArticle) return null;

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        width: 400,
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        Next recommended read
      </Typography>
      <Link href={`/${nextArticle.guid}`} style={{ textDecoration: 'none' }}>
        <Typography variant="body1" color="primary" sx={{ display: 'inline-flex', alignItems: 'center', fontWeight: 500 }}>
          {nextArticle.title} <span style={{ marginLeft: 6, fontSize: 18 }}>→</span>
        </Typography>
      </Link>
    </Box>
  );
} 