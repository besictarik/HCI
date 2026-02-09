import { getPayload } from "payload";
import config from "@/payload.config";
import { CourseContent } from "@/lib/data/courses/types";

type LessonDoc = {
  title?: string | null;
  duration?: string | null;
  description?: string | null;
  completed?: boolean | null;
};

type ModuleDoc = {
  title?: string | null;
  lessons?: LessonDoc[] | null;
};

type CourseDoc = {
  id: number | string;
  title?: string | null;
  contentModules?: ModuleDoc[] | null;
};

export const getCourseContent = async (
  slug: string
): Promise<CourseContent | null> => {
  const payload = await getPayload({ config: await config });

  const { docs } = await payload.find({
    collection: "courses",
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          status: {
            equals: "published",
          },
        },
      ],
    },
    limit: 1,
    depth: 0,
  });

  const course = (docs as CourseDoc[])[0];

  if (!course) {
    return null;
  }

  const modules = (course.contentModules || []).map((module, moduleIndex) => ({
    id: moduleIndex + 1,
    title: module.title || `Module ${moduleIndex + 1}`,
    lessons: (module.lessons || []).map((lesson, lessonIndex) => ({
      id: `m${moduleIndex + 1}-l${lessonIndex + 1}`,
      title: lesson.title || `Lesson ${lessonIndex + 1}`,
      duration: lesson.duration || "N/A",
      description: lesson.description || "",
      completed: Boolean(lesson.completed),
    })),
  }));

  return {
    id: course.id,
    title: course.title || "Untitled Course",
    modules,
  };
};
