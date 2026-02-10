import { getPayload } from "payload";
import { unstable_cache } from "next/cache";
import config from "@/payload.config";
import { CourseFilters, CoursePreview } from "@/lib/data/courses/types";

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
  status?: "draft" | "published" | null;
};

const resolveMediaUrl = (value: unknown) => {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const url = (value as { url?: string }).url;
  return typeof url === "string" && url.length > 0 ? url : undefined;
};

const normalizeTextFilter = (value?: string) => {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
};

const queryCourses = async (filters: CourseFilters = {}): Promise<CoursePreview[]> => {
  const payload = await getPayload({ config: await config });
  const q = normalizeTextFilter(filters.q);
  const category = normalizeTextFilter(filters.category);
  const andConditions: Array<Record<string, unknown>> = [
    {
      status: {
        equals: "published",
      },
    },
  ];

  if (category) {
    andConditions.push({
      category: {
        equals: category,
      },
    });
  }

  if (q) {
    andConditions.push({
      or: [
        {
          title: {
            contains: q,
          },
        },
        {
          description: {
            contains: q,
          },
        },
        {
          instructor: {
            contains: q,
          },
        },
      ],
    });
  }

  const { docs } = await payload.find({
    collection: "courses",
    where: {
      and: andConditions as never[],
    },
    sort: "title",
    limit: 100,
    depth: 1,
  });

  return (docs as CourseDoc[]).map((course) => ({
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
  }));
};

export const getCourses = async (filters: CourseFilters = {}): Promise<CoursePreview[]> => {
  const q = normalizeTextFilter(filters.q) || "";
  const category = normalizeTextFilter(filters.category) || "";

  const getCoursesCached = unstable_cache(
    () => queryCourses({ q, category }),
    [`courses:list:${q}:${category}`],
    {
      tags: ["courses"],
    }
  );

  return getCoursesCached();
};
