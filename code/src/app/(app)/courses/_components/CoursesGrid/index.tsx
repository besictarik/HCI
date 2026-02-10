import { getCourses } from "@/lib/data/courses";
import Link from "next/link";
import CourseCard from "../../../_components/CourseCard";

const parsePage = (value?: string) => {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
};

const ALLOWED_LIMITS = [3, 6, 9, 12, 24] as const;
const DEFAULT_LIMIT = 9;

const parseLimit = (value?: string) => {
  const parsed = Number.parseInt(value || "", 10);
  return ALLOWED_LIMITS.includes(parsed as (typeof ALLOWED_LIMITS)[number])
    ? parsed
    : DEFAULT_LIMIT;
};

const CoursesGrid = async ({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{
    q?: string;
    category?: string;
    page?: string;
    limit?: string;
  }>;
}) => {
  const params = await searchParamsPromise;
  const page = parsePage(params.page);
  const limit = parseLimit(params.limit);
  const filters = {
    q: params.q?.trim() || undefined,
    category: params.category?.trim() || undefined,
    page,
    limit,
  };
  const courses = await getCourses(filters);
  const from = courses.totalDocs === 0 ? 0 : (courses.page - 1) * limit + 1;
  const to = Math.min(courses.page * limit, courses.totalDocs);

  return (
    <section className="pt-6 pb-12 md:pt-8 md:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground mb-6">
          {courses.totalDocs} course{courses.totalDocs === 1 ? "" : "s"} found
          {courses.totalDocs > 0 ? ` • Showing ${from}-${to}` : ""}
        </p>
        {courses.docs.length === 0 ? (
          <p className="text-muted-foreground">
            No courses match your current filters. Try adjusting search or reset
            filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.docs.map((course) => (
              <Link key={course.id} href={`/course/${course.slug}`}>
                <CourseCard course={course} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesGrid;
