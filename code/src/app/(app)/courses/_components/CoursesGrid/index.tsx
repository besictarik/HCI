import { getCourses } from "@/lib/data/courses";
import Link from "next/link";
import CourseCard from "../../../_components/CourseCard";

const CoursesGrid = async ({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{
    q?: string;
    category?: string;
  }>;
}) => {
  const params = await searchParamsPromise;
  const filters = {
    q: params.q?.trim() || undefined,
    category: params.category?.trim() || undefined,
  };
  const courses = await getCourses(filters);

  return (
    <section className="pt-6 pb-12 md:pt-8 md:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground mb-6">
          {courses.length} course{courses.length === 1 ? "" : "s"} found
        </p>
        {courses.length === 0 ? (
          <p className="text-muted-foreground">
            No courses match your current filters. Try adjusting search or reset
            filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
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
