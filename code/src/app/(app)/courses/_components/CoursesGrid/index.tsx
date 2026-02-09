import { getCourses } from "@/lib/data/courses";
import Link from "next/link";
import CourseCard from "../../../_components/CourseCard";

const CoursesGrid = async () => {
  const courses = await getCourses();
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link key={course.id} href={`/course/${course.slug}`}>
              <CourseCard course={course} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesGrid;
