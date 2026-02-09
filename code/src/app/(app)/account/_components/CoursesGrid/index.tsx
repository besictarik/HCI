import { getCourses } from "@/lib/data/courses";
import Link from "next/link";
import Card from "./Card";

const CoursesGrid = async () => {
  const courses = (await getCourses()).slice(0, 2);
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
          Purchased Courses
        </h2>
        <p className="text-lg text-muted-foreground mb-12">
          Ready to Start Learning?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link key={course.id} href={`/course/${course.slug}/learn`}>
              <Card course={course} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesGrid;
