export type CoursePreview = {
  id: number;
  title: string;
  category: string;
  instructor: string;
  price: number;
  rating: number;
  students: number;
  description: string;
  level: string;
  duration: string;
};

export type Course = {
  id: number;
  slug: string;
  title: string;
  category: string;
  instructor: string;
  instructorBio: string;
  price: number;
  rating: number;
  students: number;
  reviews: number;
  description: string;
  fullDescription: string;
  level: string;
  duration: string;
  prerequisites: string;
  learnings: string[];
};

type Lesson = {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
};

type Module = {
  id: number;
  title: string;
  lessons: Lesson[];
};

export type CourseContent = {
  id: number;
  title: string;
  modules: Module[];
};
