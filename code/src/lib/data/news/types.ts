export type Article = {
  id: number | string;
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
};
