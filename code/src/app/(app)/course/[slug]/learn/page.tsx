import Sidebar from "./_components/Sidebar";
import { getCourse, getCourseContent } from "@/lib/data/courses";

const Page = () => {
  const course = getCourse();
  const courseContent = getCourseContent();

  const selectedLesson = courseContent.modules[0].lessons[0];

  return (
    <div className="w-full flex h-[calc(100vh-65px)]">
      {/* Sidebar */}
      <Sidebar course={course} courseContent={courseContent} />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 border-b border-border flex items-center px-4 gap-4 bg-background">
          <div className="flex-1 min-w-0">
            <div>
              <p className="text-xs text-muted-foreground">{course.title}</p>
              <h1 className="text-lg font-semibold text-foreground line-clamp-1">
                {selectedLesson.title}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
