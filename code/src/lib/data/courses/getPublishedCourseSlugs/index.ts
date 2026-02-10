import { getPayload } from "payload";
import { unstable_cache } from "next/cache";
import config from "@/payload.config";

type CourseSlugDoc = {
  slug?: string | null;
};

const queryPublishedCourseSlugs = async (): Promise<string[]> => {
  const payload = await getPayload({ config: await config });
  const { docs } = await payload.find({
    collection: "courses",
    where: {
      status: {
        equals: "published",
      },
    },
    sort: "title",
    limit: 1000,
    depth: 0,
  });

  return (docs as CourseSlugDoc[])
    .map((doc) => doc.slug)
    .filter((slug): slug is string => Boolean(slug));
};

export const getPublishedCourseSlugs = async (): Promise<string[]> => {
  const getPublishedCourseSlugsCached = unstable_cache(
    () => queryPublishedCourseSlugs(),
    ["courses:slugs:published"],
    {
      tags: ["courses"],
    }
  );

  return getPublishedCourseSlugsCached();
};
