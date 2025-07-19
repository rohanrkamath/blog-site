// ** react
import { Fragment } from "react";

// ** mui
import Box from "@mui/material/Box";

// ** components
import ArticleItem from "@/components/article/Item";
import Pagination from "@/components/Pagination";

// ** service
import ArticleService from "@/services/ArticleService";

// ** models
import ListResponseModel from "@/models/ListResponseModel";
import ArticleModel from "@/models/ArticleModel";
import { OrderType } from "@/models/enums";

// ** config
import { PAGE_SIZE } from "@/config";

// ** next
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { headers } from "next/headers";

export const revalidate = 0;

// Force dynamic rendering
export const dynamic = "force-dynamic";

// Disable all caching
export const fetchCache = "force-no-store";

export default async function BlogIndex() {
  // Force cache revalidation
  headers();
  
  try {
    const articles = (await ArticleService.getItems({
      page: 1,
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
            currentPage={1}
          />
        </Box>
      </Fragment>
    );
  } catch (error) {
    console.error('Error fetching articles:', error);
    // Return a fallback UI if backend is not accessible
    return (
      <Fragment>
        <Box component="section" sx={{ textAlign: 'center', py: 4 }}>
          <p>Unable to load articles at the moment. Please try again later.</p>
        </Box>
      </Fragment>
    );
  }
}
