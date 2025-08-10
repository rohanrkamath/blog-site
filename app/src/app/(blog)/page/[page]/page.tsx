// ** react
import { Fragment } from "react";

// ** next
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

// ** mui
import Box from "@mui/material/Box";

// ** components
import Pagination from "@/components/Pagination";
import ArticleItem from "@/components/article/Item";

// ** services
import ArticleService from "@/services/ArticleService";

// ** models
import ArticleModel from "@/models/ArticleModel";
import ListResponseModel from "@/models/ListResponseModel";
import { OrderType } from "@/models/enums";

// ** config
import { PAGE_SIZE } from "@/config";

// Force dynamic rendering
export const dynamic = "force-dynamic";

// Disable all caching
export const fetchCache = "force-no-store";

export const revalidate = 0; // Disable static generation

type BlogPagingProps = {
  params: { page: string };
};

export default async function BlogPaging({ params }: BlogPagingProps) {
  // Force cache revalidation
  headers();

  const page = params?.page;

  const currentPage = Number(page);
  if (isNaN(currentPage) || !currentPage) return notFound();

  try {
  const articles = (await ArticleService.getItems({
    page: Number(params.page),
    pageSize: PAGE_SIZE,
    order: "publishingDate",
    orderBy: OrderType.ASC,
    isShow: true
  }))?.data as ListResponseModel<ArticleModel[]>;

  if (!articles) return notFound();

  return (
    <Fragment>
      <Box component="section">
        {articles.results?.map((item: ArticleModel) => (
          <ArticleItem data={item} key={item._id} />
        ))}
      </Box>
      <Box component="section" sx={{ mt: 4 }}>
        <Pagination
          routerUrl={`page`}
          totalPages={articles.totalPages}
          currentPage={currentPage}
        />
      </Box>
    </Fragment>
  );
  } catch (error) {
    console.error('Error fetching articles:', error);
    return notFound();
  }
}

export async function generateStaticParams() {
  try {
  const items = (
    await ArticleService.getItems({
      page: 1,
      pageSize: PAGE_SIZE,
      isShow: true,
    })
  )?.data as ListResponseModel<ArticleModel[]>;

    if (!items) return [];

  const paths = [...Array(items.totalPages)].map((_, page: number) => ({
    page: (page + 1).toString(),
  }));
  return paths;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPagingProps): Promise<Metadata> {
  const page = params.page;

  return {
    title: `Page: ${page}`,
  };
}
