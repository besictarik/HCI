import { getPayload } from "payload";
import { unstable_cache } from "next/cache";
import config from "@/payload.config";
import { Course } from "@/lib/data/courses/types";

type Learning = {
  value?: string | null;
};

type CourseDoc = {
  id: number | string;
  slug?: string | null;
  title?: string | null;
  category?: string | null;
  instructor?: string | null;
  instructorBio?: string | null;
  price?: number | null;
  rating?: number | null;
  students?: number | null;
  reviews?: number | null;
  description?: string | null;
  fullDescription?: string | null;
  level?: string | null;
  duration?: string | null;
  prerequisites?: string | null;
  learnings?: Learning[] | null;
  coverImage?: unknown;
};

const resolveMediaUrl = (value: unknown) => {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const url = (value as { url?: string }).url;
  return typeof url === "string" && url.length > 0 ? url : undefined;
};

const queryCourse = async (slug: string): Promise<Course | null> => {
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
    depth: 1,
  });

  const course = (docs as CourseDoc[])[0];

  if (!course) {
    return null;
  }

  return {
    id: course.id,
    slug: course.slug || String(course.id),
    title: course.title || "Untitled Course",
    category: course.category || "General",
    instructor: course.instructor || "Scholia Team",
    instructorBio: course.instructorBio || "",
    price: course.price ?? 0,
    rating: course.rating ?? 0,
    students: course.students ?? 0,
    reviews: course.reviews ?? 0,
    description: course.description || "",
    fullDescription: course.fullDescription || "",
    level: course.level || "Beginner",
    duration: course.duration || "N/A",
    prerequisites: course.prerequisites || "",
    learnings:
      course.learnings
        ?.map((item) => item.value)
        .filter((value): value is string => Boolean(value)) || [],
    imageUrl: resolveMediaUrl(course.coverImage),
  };
};

export const getCourse = async (slug: string): Promise<Course | null> => {
  const getCourseCached = unstable_cache(() => queryCourse(slug), [`course:${slug}`], {
    tags: ["courses", `course:${slug}`],
  });

  return getCourseCached();
};
