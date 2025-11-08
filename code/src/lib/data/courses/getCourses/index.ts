export const getCourses = () => {
  return [
    {
      id: 1,
      slug: "web-development-fundamentals",
      title: "Web Development Fundamentals",
      category: "Web Development",
      instructor: "John Smith",
      price: 49,
      rating: 4.8,
      students: 2500,
      description:
        "Master the essential skills needed to build modern web applications with hands-on projects.",
      level: "Beginner",
      duration: "8 weeks",
    },
    {
      id: 2,
      slug: "advanced-javascript",
      title: "Advanced JavaScript",
      category: "Programming",
      instructor: "Sarah Johnson",
      price: 59,
      rating: 4.9,
      students: 1800,
      description:
        "Deep dive into advanced JavaScript concepts and master asynchronous programming.",
      level: "Intermediate",
      duration: "10 weeks",
    },
    {
      id: 3,
      slug: "react-and-nextjs-mastery",
      title: "React & Next.js Mastery",
      category: "Web Development",
      instructor: "Mike Chen",
      price: 69,
      rating: 4.7,
      students: 3200,
      description:
        "Learn to build production-ready React applications with Next.js framework.",
      level: "Intermediate",
      duration: "12 weeks",
    },
  ];
};
