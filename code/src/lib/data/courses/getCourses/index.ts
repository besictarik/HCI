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
  status?: "draft" | "published" | null;
};

const resolveMediaUrl = (value: unknown) => {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const url = (value as { url?: string }).url;
  return typeof url === "string" && url.length > 0 ? url : undefined;
};

export const getCourses = async (): Promise<CoursePreview[]> => {
  const payload = await getPayload({ config: await config });

  const { docs } = await payload.find({
    collection: "courses",
    where: {
      status: {
        equals: "published",
      },
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
