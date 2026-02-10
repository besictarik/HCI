import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";
import { Course } from "@/lib/data/courses/types";
import CourseActions from "./CourseActions";
import CourseActionsSkeleton from "./CourseActions/skeleton";

type HeroProps = {
  course: Course;
};

const Hero = ({ course }: HeroProps) => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-2 lg:items-start">
        <div>
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
          <p className="text-xl font-bold text-foreground mb-6">${course.price}</p>
          <Suspense fallback={<CourseActionsSkeleton />}>
            <CourseActions courseId={course.id} courseSlug={course.slug} />
          </Suspense>
        </div>
        <div className="relative min-h-64 h-full rounded-lg border border-border overflow-hidden bg-card">
          {course.imageUrl ? (
            <Image
              src={course.imageUrl}
              alt={course.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground">
              Course Image
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="text-sm/6 opacity-90">{course.category}</p>
            <p className="text-lg font-semibold line-clamp-2">{course.title}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
