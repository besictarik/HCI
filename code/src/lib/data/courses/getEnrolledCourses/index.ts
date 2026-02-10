import { getPayload } from "payload";
import config from "@/payload.config";
import { CoursePreview } from "@/lib/data/courses/types";

type CourseDoc = {
  id: number | string;
  slug?: string | null;
  title?: string | null;
  category?: string | null;
  instructor?: string | null;
  price?: number | null;
  rating?: number | null;
  students?: number | null;
  description?: string | null;
  level?: string | null;
  duration?: string | null;
  coverImage?: unknown;
  contentModules?: Array<{
    lessons?: Array<unknown> | null;
  }> | null;
};

type EnrollmentDoc = {
  course?: number | string | CourseDoc | null;
};

type LessonProgressDoc = {
  course?: number | string | { id?: number | string } | null;
};

const getRelationId = (value: unknown): number | string | null => {
  if (typeof value === "number" || typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object") {
    const id = (value as { id?: unknown }).id;
    if (typeof id === "number" || typeof id === "string") {
      return id;
    }
  }

  return null;
};

const getTotalLessons = (course: CourseDoc) => {
  const modules = course.contentModules || [];
  return modules.reduce((count, module) => count + (module.lessons?.length || 0), 0);
};

const resolveMediaUrl = (value: unknown) => {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const url = (value as { url?: string }).url;
  return typeof url === "string" && url.length > 0 ? url : undefined;
};

const toCoursePreview = (course: CourseDoc): CoursePreview => ({
  id: course.id,
  slug: course.slug || String(course.id),
  title: course.title || "Untitled Course",
  category: course.category || "General",
  instructor: course.instructor || "Scholia Team",
  price: course.price ?? 0,
  rating: course.rating ?? 0,
  students: course.students ?? 0,
  description: course.description || "",
  level: course.level || "Beginner",
  duration: course.duration || "N/A",
  imageUrl: resolveMediaUrl(course.coverImage),
});

export const getEnrolledCourses = async (customerId: number | string): Promise<CoursePreview[]> => {
  const payload = await getPayload({ config: await config });

  const [{ docs: enrollmentDocs }, { docs: progressDocs }] = await Promise.all([
    payload.find({
      collection: "enrollments",
      where: {
        and: [
          {
            customer: {
              equals: customerId,
            },
          },
          {
            status: {
              equals: "active",
            },
          },
        ],
      },
      sort: "-acquiredAt",
      limit: 100,
      depth: 2,
    }),
    payload.find({
      collection: "lesson-progress",
      where: {
        customer: {
          equals: customerId,
        },
      },
      limit: 2000,
      depth: 0,
    }),
  ]);

  const completedByCourse = new Map<string, number>();
  for (const item of progressDocs as LessonProgressDoc[]) {
    const courseId = getRelationId(item.course);
    if (!courseId) {
      continue;
    }

    const key = String(courseId);
    completedByCourse.set(key, (completedByCourse.get(key) || 0) + 1);
  }

  const seen = new Set<string>();
  const courses: CoursePreview[] = [];

  for (const enrollment of enrollmentDocs as EnrollmentDoc[]) {
    const relation = enrollment.course;

    if (!relation || typeof relation !== "object") {
      continue;
    }

    const course = relation as CourseDoc;
    const dedupeKey = String(course.id);

    if (seen.has(dedupeKey)) {
      continue;
    }

    seen.add(dedupeKey);
    const totalLessons = getTotalLessons(course);
    const completedLessons = completedByCourse.get(dedupeKey) || 0;
    courses.push({
      ...toCoursePreview(course),
      progress: {
        completedLessons: Math.min(completedLessons, totalLessons),
        totalLessons,
      },
    });
  }

  return courses;
};
