// ** react
import { Fragment } from "react";

// ** next
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

// ** services
import ArticleService from "@/services/ArticleService";
import CategoryService from "@/services/CategoryService";

// ** mui
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// ** components
import ArticleItem from "@/components/article/Item";
import ServerPagination from "@/components/ServerPagination";

// ** models
import ArticleModel from "@/models/ArticleModel";
import CategoryModel from "@/models/CategoryModel";
import ListResponseModel from "@/models/ListResponseModel";

// ** config
import { PAGE_SIZE } from "@/config";

type BlogCategoryGuidProps = {
  params: { guid: string };
};

export default async function BlogGuid({ params }: BlogCategoryGuidProps) {
  const guid = params.guid;

  if (!guid) return notFound();

  const categoryData = await CategoryService.getItemByGuid(params?.guid);

  const data = (
    await ArticleService.getItems({
      category: categoryData?.data?._id,
      page: 1,
      pageSize: PAGE_SIZE,
      paging: 1,
      isShow: true,
    })
  )?.data as ListResponseModel<ArticleModel[]>;

  if (!data) return notFound();

  return (
    <Fragment>
      <Paper
        elevation={1}
        component="header"
        sx={{ 
          padding: 1, 
          paddingRight: 2, 
          paddingLeft: 2, 
          marginBottom: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box>
          <Typography
            component="h1"
            variant="subtitle1"
            fontWeight="bold"
          >{`Category: ${categoryData?.data?.title}`}</Typography>
          {categoryData?.data?.description && (
            <Typography component="p" variant="caption" color="gray">
              {categoryData.data?.description}
            </Typography>
          )}
        </Box>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <IconButton 
            size="small"
            aria-label="remove category filter"
            sx={{ 
              ml: 2,
              '&:hover': {
                backgroundColor: 'action.hover'
              }
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Link>
      </Paper>
      <Box component="section">
        {data.results.map((item) => (
          <ArticleItem key={item._id} data={item} />
        ))}
      </Box>

      <Box component="section">
        <ServerPagination
          routerUrl={`category/${guid}/page`}
          totalPages={data.totalPages}
          currentPage={data.currentPage}
        />
      </Box>
    </Fragment>
  );
}

export async function generateStaticParams() {
  const categories = (
    await CategoryService.getItems({
      paging: 0,
      sType: "parent",
      s: "null",
    })
  )?.data as CategoryModel[];

  return categories.map((item) => ({
    guid: item.guid,
  }));
}

export async function generateMetadata({
  params,
}: BlogCategoryGuidProps): Promise<Metadata> {
  const guid = params.guid;
  const item = await CategoryService.getItemByGuid(guid);

  return {
    title: `Category: ${item?.data?.title}`,
  };
}
