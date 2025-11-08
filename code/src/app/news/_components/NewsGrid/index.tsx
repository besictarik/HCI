import { getNews } from "@/lib/data/news";
import Link from "next/link";
import Card from "./Card";

const NewsGrid = () => {
  const news = getNews();

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article) => (
            <Link key={article.id} href={`/news/${article.slug}`}>
              <Card article={article} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsGrid;
