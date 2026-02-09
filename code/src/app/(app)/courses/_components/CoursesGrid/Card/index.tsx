import { CoursePreview } from "@/lib/data/courses/types";

const Card = ({ course }: { course: CoursePreview }) => {
  return (
    <div className="group rounded-lg border border-border bg-card h-full hover:shadow-lg transition-all duration-300 hover:border-primary overflow-hidden flex flex-col">
      <div className="h-48 bg-black flex items-center justify-center text-muted-foreground">
        Course Image
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
        </div>
      </div>
    </div>
  );
};

export default Card;
