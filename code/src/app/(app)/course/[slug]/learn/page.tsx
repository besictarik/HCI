import Sidebar from "./_components/Sidebar";
import { getCourse, getCourseContent } from "@/lib/data/courses";
import { getCurrentCustomer } from "@/lib/auth/getCurrentCustomer";
import { getCompletedLessonsForCourse } from "@/lib/data/progress";
import { Suspense } from "react";
import LessonContentPanel from "./_components/LessonContentPanel";
import LessonContentSkeleton from "./_components/LessonContentSkeleton";
import TopBarProgress from "./_components/TopBarProgress";
import LessonsMenuButton from "./_components/LessonsMenuButton";
import { notFound } from "next/navigation";

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lesson?: string }>;
}) => {
  const { slug } = await params;
  const { lesson } = await searchParams;
  const customer = await getCurrentCustomer();
  const customerId = customer?.id;
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  const courseContent = await getCourseContent(slug);

  if (!courseContent) {
    notFound();
  }

  if (courseContent.modules.length === 0) {
    notFound();
  }

  const lessons = courseContent.modules.flatMap((module) => module.lessons);
  const firstLesson = lessons[0];

  if (!firstLesson) {
    notFound();
  }

  const selectedLesson =
    lessons.find((currentLesson) => currentLesson.id === lesson) || firstLesson;
  const totalLessons = lessons.length;

  if (!customerId) {
    // Access is already guarded in learn/layout.tsx.
    notFound();
  }

  const completedLessonIds = await getCompletedLessonsForCourse({
    customerId,
    courseId: course.id,
  });
  const completedCount = completedLessonIds.length;

  return (
    <div className="w-full flex h-[calc(100vh-65px)]">
      {/* Sidebar */}
      <Sidebar
        course={course}
        courseContent={courseContent}
        selectedLessonId={selectedLesson.id}
        completedLessonIds={completedLessonIds}
      />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 border-b border-border flex items-center gap-3 bg-background px-4 md:gap-4">
          <LessonsMenuButton />
          <div className="flex-1 min-w-0">
            <div>
              <p className="text-xs text-muted-foreground">{course.title}</p>
              <h1 className="text-lg font-semibold text-foreground line-clamp-1">
                {selectedLesson.title}
              </h1>
            </div>
          </div>
          <TopBarProgress completedCount={completedCount} totalLessons={totalLessons} />
        </div>
        <Suspense key={selectedLesson.id} fallback={<LessonContentSkeleton />}>
          <LessonContentPanel
            courseId={course.id}
            courseSlug={slug}
            customerId={customerId}
            courseContent={courseContent}
            selectedLessonId={selectedLesson.id}
            completedLessonIds={completedLessonIds}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
