import Breadcrumb from "./_components/Breadcrumb";
import Content from "./_components/Content";
import { getArticle } from "@/lib/data/news";

export const generateStaticParams = async () => {
  return Array.from({ length: 10 }, (_, index) => ({
    slug: (index + 1).toString(),
  }));
};

const Page = async ({ params }: { params: { slug: string } }) => {
  // Renamed temporary to ID to satisfy placeholder API
  const { slug: id } = params;
  const article = await getArticle(id);
  return (
    <>
      <Breadcrumb article={article} />
      <Content article={article} />
    </>
  );
};

export default Page;
