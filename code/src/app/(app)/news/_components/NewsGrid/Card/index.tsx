import React from "react";
import Image from "next/image";
import { Article } from "@/lib/data/news/types";

const Card = ({ article }: { article: Article }) => {
  return (
    <div className="group rounded-lg border border-border bg-card h-full hover:shadow-lg transition-all duration-300 hover:border-primary overflow-hidden flex flex-col">
      <div className="h-40 relative bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center text-muted-foreground">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
          />
        ) : (
          "Article Image"
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase">
            {article.category}
          </span>
          <span className="text-xs text-muted-foreground">{article.date}</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {article.title}
        </h3>
        <div className="mt-auto pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">By {article.author}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
