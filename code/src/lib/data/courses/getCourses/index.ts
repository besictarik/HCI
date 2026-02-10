import { getPayload } from "payload";
import { unstable_cache } from "next/cache";
import config from "@/payload.config";
import { CourseFilters, PaginatedCourses } from "@/lib/data/courses/types";

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

const normalizePositiveNumber = (value: number | undefined, fallback: number) => {
  if (!value || Number.isNaN(value)) {
    return fallback;
  }

  return value > 0 ? Math.floor(value) : fallback;
};

const queryCourses = async (filters: CourseFilters = {}): Promise<PaginatedCourses> => {
  const payload = await getPayload({ config: await config });
  const q = normalizeTextFilter(filters.q);
  const category = normalizeTextFilter(filters.category);
  const page = normalizePositiveNumber(filters.page, 1);
  const limit = normalizePositiveNumber(filters.limit, 9);
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

  const result = await payload.find({
    collection: "courses",
    where: {
      and: andConditions as never[],
    },
    sort: "title",
    page,
    limit,
    depth: 1,
  });

  const mappedDocs = (result.docs as CourseDoc[]).map((course) => ({
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

  return {
    docs: mappedDocs,
    page: result.page || page,
    totalPages: result.totalPages || 1,
    totalDocs: result.totalDocs || 0,
    hasPrevPage: Boolean(result.hasPrevPage),
    hasNextPage: Boolean(result.hasNextPage),
  };
};

export const getCourses = async (filters: CourseFilters = {}): Promise<PaginatedCourses> => {
  const q = normalizeTextFilter(filters.q) || "";
  const category = normalizeTextFilter(filters.category) || "";
  const page = normalizePositiveNumber(filters.page, 1);
  const limit = normalizePositiveNumber(filters.limit, 9);

  const getCoursesCached = unstable_cache(
    () => queryCourses({ q, category, page, limit }),
    [`courses:list:${q}:${category}:${page}:${limit}`],
    {
      tags: ["courses"],
    }
  );

  return getCoursesCached();
};
