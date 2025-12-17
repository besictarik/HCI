export const getArticle = async (id: string) => {
  const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
  const res = await fetch(`${BASE_URL}/${id}`);
  const { title = "Untitled Article", body = "" } = await res.json();
  console.log(title, body);

  return {
    id: 1,
    slug: "ai-powered-learning-features-released",
    title: title,
    category: "Product",
    date: "November 4, 2025",
    author: "Sarah Chen",
    content: body,
  };
};
