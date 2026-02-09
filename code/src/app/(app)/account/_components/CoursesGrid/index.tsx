import { getEnrolledCourses } from "@/lib/data/courses";
import { getCurrentCustomer } from "@/lib/auth/getCurrentCustomer";
import { Button } from "@/ui/button";
import Link from "next/link";
import Card from "./Card";

const CoursesGrid = async () => {
  const customer = await getCurrentCustomer();

  if (!customer?.id) {
    return (
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Purchased Courses
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            No courses to show yet. Log in to view your learning dashboard.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <Button asChild>
              <Link href="/login?redirect=%2Faccount">Log In</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/courses">Explore Courses</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const courses = await getEnrolledCourses(customer.id);

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
          Purchased Courses
        </h2>
        <p className="text-lg text-muted-foreground mb-12">
          Ready to Start Learning?
        </p>
        {courses.length === 0 ? (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              You have not acquired any courses yet. Explore courses to get started.
            </p>
            <Button asChild>
              <Link href="/courses">Explore Courses</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link key={course.id} href={`/course/${course.slug}/learn`}>
                <Card course={course} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesGrid;
