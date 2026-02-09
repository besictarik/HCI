export type CoursePreview = {
  id: number | string;
  slug: string;
  title: string;
  category: string;
  instructor: string;
  price: number;
  rating: number;
  students: number;
  description: string;
  level: string;
  duration: string;
  imageUrl?: string;
};

export type Course = {
  id: number | string;
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
  imageUrl?: string;
};

type Lesson = {
  id: string;
  title: string;
  duration: string;
  description: string;
  completed: boolean;
};

type Module = {
  id: number;
  title: string;
  lessons: Lesson[];
};

export type CourseContent = {
  id: number | string;
  title: string;
  modules: Module[];
};
