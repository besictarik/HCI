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
};

type EnrollmentDoc = {
  course?: number | string | CourseDoc | null;
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

export const getEnrolledCourses = async (
  customerId: number | string
): Promise<CoursePreview[]> => {
  const payload = await getPayload({ config: await config });

  const { docs } = await payload.find({
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
  });

  const seen = new Set<string>();
  const courses: CoursePreview[] = [];

  for (const enrollment of docs as EnrollmentDoc[]) {
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
    courses.push(toCoursePreview(course));
  }

  return courses;
};
