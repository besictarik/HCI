import { getPayload } from "payload";
import { unstable_cache } from "next/cache";
import config from "@/payload.config";

type FilterOptions = {
  categories: string[];
};

type CourseDoc = {
  category?: string | null;
};

const queryCourseFilterOptions = async (): Promise<FilterOptions> => {
  const payload = await getPayload({ config: await config });

  const { docs } = await payload.find({
    collection: "courses",
    where: {
      status: {
        equals: "published",
      },
    },
    select: {
      category: true,
    },
    limit: 1000,
    depth: 0,
  });

  const categories = new Set<string>();
  for (const course of docs as CourseDoc[]) {
    if (course.category) {
      categories.add(course.category);
    }
  }

  return {
    categories: Array.from(categories).sort((a, b) => a.localeCompare(b)),
  };
};

const getCourseFilterOptionsCached = unstable_cache(
  queryCourseFilterOptions,
  ["courses:filter-options"],
  {
    tags: ["courses"],
  }
);

export const getCourseFilterOptions = async (): Promise<FilterOptions> => {
  return getCourseFilterOptionsCached();
};
