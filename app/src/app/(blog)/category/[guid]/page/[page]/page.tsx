// ** react
import { Fragment } from "react";

// ** next
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

// ** mui
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// ** components
import ServerPagination from "@/components/ServerPagination";
import ArticleItem from "@/components/article/Item";

// ** services
import ArticleService from "@/services/ArticleService";
import CategoryService from "@/services/CategoryService";

// ** models
import ArticleModel from "@/models/ArticleModel";
import ListResponseModel from "@/models/ListResponseModel";
import CategoryModel from "@/models/CategoryModel";

// ** config
import { PAGE_SIZE } from "@/config";

type BlogCategoryPagingProps = {
  params: { page: string; guid: string };
};

type StaticPathParams = {
  guid: string;
  page: string;
};

export default async function BlogCategoryPaging({
  params,
}: BlogCategoryPagingProps) {
  const page = params?.page;
  const guid = params?.guid;

  const currentPage = Number(page);

  if (isNaN(currentPage) || !currentPage) return notFound();

  const categoryData = await CategoryService.getItemByGuid(guid);

  const data = (
    await ArticleService.getItems({
      category: categoryData?.data?._id,
      page: Number(page),
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
        sx={{ padding: 1, paddingRight: 2, paddingLeft: 2, marginBottom: 3 }}
      >
        <Typography
          component="h1"
          variant="subtitle1"
          fontWeight="bold"
        >{`Category: ${categoryData?.data?.title}`}</Typography>
      </Paper>
      <Box component="section">
        {data?.results?.map((item) => (
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
  try {
    const categories = (
      await CategoryService.getItems({
        paging: 0,
      })
    )?.data as CategoryModel[];

    if (!categories) return [];

    let categoryGuidTotalPages = [];

    for await (const category of categories) {
      const articlePaging = (
        await ArticleService.getItems({
          category: category._id,
          paging: 1,
          page: 1,
          pageSize: PAGE_SIZE,
        })
      )?.data as ListResponseModel<ArticleModel[]>;

      categoryGuidTotalPages.push({
        guid: category.guid,
        totalPages: articlePaging?.totalPages || 0,
      });
    }

    const paths = new Array<StaticPathParams>();

    for (const item of categoryGuidTotalPages) {
      if (item.totalPages <= 1) continue;
      [...Array(item.totalPages)].forEach((_, i) => {
        paths.push({
          guid: item.guid,
          page: String(i + 1),
        });
      });
    }

    return paths;
  } catch (error) {
    console.error('Error generating static params for category pages:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogCategoryPagingProps): Promise<Metadata> {
  const guid = params.guid;
  const page = params.page;

  const data = await CategoryService.getItemByGuid(guid);

  return {
    title: `Category: ${data?.data?.title} - Page: ${page}`,
  };
}
