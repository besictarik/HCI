import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Article } from "@/lib/data/news/types";

const Breadcrumb = ({ article }: { article: Article }) => {
  return (
    <section className="py-6 md:py-8 border-b border-border">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/news" className="hover:text-foreground">
            News
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span>{article.category}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
          {article.title}
        </h1>
        <div className="flex items-center gap-6 flex-wrap text-sm text-muted-foreground">
          <span>By {article.author}</span>
          <span>{article.date}</span>
          <span className="text-accent font-semibold">{article.category}</span>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
