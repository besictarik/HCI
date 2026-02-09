import Breadcrumb from "./_components/Breadcrumb";
import Content from "./_components/Content";
import { getArticle, getNews } from "@/lib/data/news";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  const articles = await getNews();

  return articles.map((article) => ({
    slug: article.slug,
  }));
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Breadcrumb article={article} />
      <Content article={article} />
    </>
  );
};

export default Page;
