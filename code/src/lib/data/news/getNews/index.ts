import { Article } from "@/lib/data/news/types";

export const getNews = async (): Promise<Article[]> => {
  const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
  const res = await fetch(`${BASE_URL}`);
  const posts = await res.json();

  return posts.map((post: { id: string; title: string; content: string }) => ({
    id: post.id,
    slug: "new-ai-powered-learning-features-released",
    title: post.title,
    category: "Product",
    date: "November 4, 2025",
    excerpt:
      "We're excited to announce new AI features that personalize your learning experience based on your progress and learning style.",
    author: "Sarah Chen",
    content: post.content,
  }));
};
