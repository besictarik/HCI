export const getCourseContent = () => {
  return {
    id: 1,
    title: "Web Development Fundamentals",
    modules: [
      {
        id: 1,
        title: "Getting Started",
        lessons: [
          {
            id: 1,
            title: "Welcome to the Course",
            duration: "5 min",
            completed: true,
          },
          {
            id: 2,
            title: "Setting Up Your Environment",
            duration: "15 min",
            completed: true,
          },
          {
            id: 3,
            title: "Course Overview",
            duration: "10 min",
            completed: false,
          },
        ],
      },
      {
        id: 2,
        title: "HTML Fundamentals",
        lessons: [
          { id: 4, title: "HTML Basics", duration: "20 min", completed: true },
          {
            id: 5,
            title: "Semantic HTML",
            duration: "18 min",
            completed: true,
          },
          {
            id: 6,
            title: "Forms and Input",
            duration: "22 min",
            completed: false,
          },
          {
            id: 7,
            title: "HTML Project",
            duration: "45 min",
            completed: false,
          },
        ],
      },
      {
        id: 3,
        title: "CSS Styling",
        lessons: [
          {
            id: 8,
            title: "CSS Selectors",
            duration: "20 min",
            completed: false,
          },
          { id: 9, title: "Box Model", duration: "25 min", completed: false },
          {
            id: 10,
            title: "Flexbox Layout",
            duration: "30 min",
            completed: false,
          },
        ],
      },
    ],
  };
};
