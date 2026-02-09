import { Article } from "@/lib/data/news/types";
import Image from "next/image";

const Content = ({ article }: { article: Article }) => {
  const paragraphs = (article.content || "").split("\n\n");

  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {article.imageUrl ? (
          <div className="mb-8 overflow-hidden rounded-xl border border-border">
            <Image
              src={article.imageUrl}
              alt={article.title}
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
            />
          </div>
        ) : null}
        <article className="prose prose-invert max-w-none">
          {paragraphs.map((paragraph: string, i: number) => (
            <p key={i} className="text-muted-foreground leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </article>
      </div>
    </section>
  );
};

export default Content;
