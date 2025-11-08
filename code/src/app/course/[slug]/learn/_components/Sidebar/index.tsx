import Link from "next/link";
import { CheckCircle2, ChevronRight, Play } from "lucide-react";
import { Course, CourseContent } from "@/lib/data/courses/types";

const Sidebar = ({
  course,
  courseContent,
}: {
  course: Course;
  courseContent: CourseContent;
}) => {
  return (
    <div className="fixed inset-0 z-40 md:static md:w-80 bg-card border-r border-border transition-transform duration-300">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link
            href={`/course/${course.slug}`}
            className="hover:text-primary transition-colors"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </Link>
          <h2 className="text-sm font-semibold text-foreground flex-1 px-4 line-clamp-2">
            {course.title}
          </h2>
        </div>

        {/* Modules */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 space-y-2">
            {courseContent.modules.map((module) => (
              <div
                key={module.id}
                className="font-semibold text-sm text-foreground p-2 cursor-pointer hover:bg-muted rounded group-open:bg-muted"
              >
                Module {module.id}: {module.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
