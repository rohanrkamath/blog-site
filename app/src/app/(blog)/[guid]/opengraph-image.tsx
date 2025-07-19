// ** next
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

// ** models
import ArticleModel from "@/models/ArticleModel";
import PageModel from "@/models/PageModel";

// ** services
import ArticleService from "@/services/ArticleService";
import PageService from "@/services/PageService";

// ** config
import { APP_URL, SITE_TITLE } from "@/config";

export const size = {
  width: 1200,
  height: 630,
};
export const runtime = "edge";
export const contentType = "image/png";

type BlogGuidProps = {
  params: { guid: string };
};

type DataProps = {
  type: "article" | "page" | null;
  item: ArticleModel | PageModel | null;
};

const getData = async (guid: string) => {
  let data: DataProps = {
    type: null,
    item: null,
  };
  const article = await ArticleService.getItemByGuid(guid);
  if (!article || !article?.data?.guid) {
    const page = await PageService.getItemByGuid(guid);
    if (page && page?.data?.guid) {
      data = {
        type: "page",
        item: page.data,
      };
    }
  } else {
    data = {
      type: "article",
      item: article.data,
    };
  }

  return data;
};

export async function generateImageMetadata({
  params: { guid },
}: BlogGuidProps) {
  const data = await getData(guid);
  return [
    {
      alt: data.item?.title,
      id: "image",
    },
  ];
}

export default async function Image({ params: { guid } }: BlogGuidProps) {
  const data = await getData(guid);

  if (!data.item) return notFound();

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#1a1a1a",
          color: "#fff",
          padding: "40px",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 300,
            color: "#888",
          }}
        >
          {SITE_TITLE}
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#fff",
          }}
        >
          {data.item.title}
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              padding: "12px 20px",
              backgroundColor: "#333",
              borderRadius: "6px",
              fontSize: 18,
              color: "#fff",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span>Read Article</span>
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
