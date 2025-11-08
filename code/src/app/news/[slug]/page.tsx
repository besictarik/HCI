import Breadcrumb from "./_components/Breadcrumb";
import Content from "./_components/Content";
import { getArticle } from "@/lib/data/news";

const Page = ({}: { params: Promise<{ slug: string }> }) => {
  const article = getArticle();
  return (
    <>
      <Breadcrumb article={article} />
      <Content article={article} />
    </>
  );
};

export default Page;
