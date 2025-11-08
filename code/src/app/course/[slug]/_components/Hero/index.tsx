import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Course } from "@/lib/data/courses/types";

const Hero = ({ course }: { course: Course }) => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/courses" className="hover:text-foreground">
            Courses
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span>{course.category}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
          {course.title}
        </h1>
        <div className="flex items-center gap-6 flex-wrap mb-6">
          <div className="flex items-center gap-2">
            <span className="text-black font-semibold">★ {course.rating}</span>
            <span className="text-muted-foreground">
              ({course.reviews} reviews)
            </span>
          </div>
          <div className="text-muted-foreground">
            {course.students}+ students enrolled
          </div>
          <div className="text-muted-foreground">
            {course.level} • {course.duration}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
