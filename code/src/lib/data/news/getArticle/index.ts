import { getPayload } from "payload";
import { unstable_cache } from "next/cache";
import config from "@/payload.config";
import type { Article as PayloadArticle } from "@/payload-types";
import { Article } from "@/lib/data/news/types";
import { formatArticleDate, lexicalToText, resolveMediaUrl } from "../helpers";

const queryArticle = async (slug: string): Promise<Article | null> => {
  const payload = await getPayload({ config: await config });

  const { docs } = await payload.find({
    collection: "articles",
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          status: {
            equals: "published",
          },
        },
      ],
    },
    limit: 1,
    depth: 1,
  });

  const article = (docs as PayloadArticle[])[0];

  if (!article) {
    return null;
  }

  return {
    id: article.id,
    slug: article.slug || String(article.id),
    title: article.title || "Untitled Article",
    category: article.category || "General",
    date: formatArticleDate(article.publishedAt),
    excerpt: article.excerpt || "",
    author: article.authorName || "Scholia Team",
    content: lexicalToText(article.content),
    imageUrl: resolveMediaUrl(article.coverImage),
  };
};

export const getArticle = async (slug: string): Promise<Article | null> => {
  const getArticleCached = unstable_cache(
    () => queryArticle(slug),
    [`article:${slug}`],
    {
      tags: ["articles", `article:${slug}`],
    }
  );

  return getArticleCached();
};
