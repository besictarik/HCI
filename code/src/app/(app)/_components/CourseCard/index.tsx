import { CoursePreview } from "@/lib/data/courses/types";
import Image from "next/image";

const CourseCard = ({ course }: { course: CoursePreview }) => {
  const completedLessons = course.progress?.completedLessons ?? 0;
  const totalLessons = course.progress?.totalLessons ?? 0;
  const progressPercent =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="group rounded-lg border border-border bg-card h-full hover:shadow-lg transition-all duration-300 hover:border-primary overflow-hidden flex flex-col">
      <div className="h-48 relative bg-muted flex items-center justify-center text-muted-foreground">
        {course.imageUrl ? (
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className="object-cover"
          />
        ) : (
          "Course Image"
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase">
          {course.category}
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {course.description}
        </p>
        <div className="mt-auto space-y-3 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {course.instructor}
            </span>
            <span className="text-xs font-semibold text-black">
              ★ {course.rating}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              {course.students}+ students • {course.duration}
            </div>
            <div className="text-lg font-bold text-primary">
              ${course.price}
            </div>
          </div>
          {totalLessons > 0 ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {completedLessons}/{totalLessons} lessons
                </span>
                <span>{progressPercent}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-foreground transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
