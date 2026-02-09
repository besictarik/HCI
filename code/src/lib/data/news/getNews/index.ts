import { getPayload } from "payload";
import { unstable_cache } from "next/cache";
import config from "@/payload.config";
import type { Article as PayloadArticle } from "@/payload-types";
import { Article } from "@/lib/data/news/types";
import { formatArticleDate, lexicalToText, resolveMediaUrl } from "../helpers";

const queryNews = async (): Promise<Article[]> => {
  const payload = await getPayload({ config: await config });

  const { docs } = await payload.find({
    collection: "articles",
    where: {
      status: {
        equals: "published",
      },
    },
    sort: "-publishedAt",
    limit: 50,
    depth: 1,
  });

  return (docs as PayloadArticle[]).map((article) => ({
    id: article.id,
    slug: article.slug || String(article.id),
    title: article.title || "Untitled Article",
    category: article.category || "General",
    date: formatArticleDate(article.publishedAt),
    excerpt: article.excerpt || "",
    author: article.authorName || "Scholia Team",
    content: lexicalToText(article.content),
    imageUrl: resolveMediaUrl(article.coverImage),
  }));
};

const getNewsCached = unstable_cache(queryNews, ["articles:list"], {
  tags: ["articles"],
});

export const getNews = async (): Promise<Article[]> => {
  return getNewsCached();
};
