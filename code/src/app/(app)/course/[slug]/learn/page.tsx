import Sidebar from "./_components/Sidebar";
import { getCourse, getCourseContent } from "@/lib/data/courses";
import { headers as getHeaders } from "next/headers";
import { getPayload } from "payload";
import config from "@/payload.config";
import { hasCourseEnrollment } from "@/lib/data/enrollments";
import { getCompletedLessonsForCourse } from "@/lib/data/progress";
import { Suspense } from "react";
import LessonContentPanel from "./_components/LessonContentPanel";
import LessonContentSkeleton from "./_components/LessonContentSkeleton";
import TopBarProgress from "./_components/TopBarProgress";
import { Skeleton } from "@/ui/skeleton";
import { notFound, redirect } from "next/navigation";

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lesson?: string }>;
}) => {
  const { slug } = await params;
  const { lesson } = await searchParams;
  const headers = await getHeaders();
  const payload = await getPayload({ config: await config });
  const { user } = await payload.auth({ headers });
  const isCustomer =
    (user as { collection?: string; id?: number | string } | null)?.collection ===
    "customers";
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  if (!isCustomer || !user?.id) {
    redirect(`/login?redirect=${encodeURIComponent(`/course/${slug}/learn`)}`);
  }

  const isEnrolled = await hasCourseEnrollment({
    customerId: user.id,
    courseId: course.id,
    payload,
  });

  if (!isEnrolled) {
    redirect(`/course/${slug}`);
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
  const completedLessonIds = await getCompletedLessonsForCourse({
    customerId: user.id,
    courseId: course.id,
    payload,
  });

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
        <div className="h-16 border-b border-border flex items-center px-4 gap-4 bg-background">
          <div className="flex-1 min-w-0">
            <div>
              <p className="text-xs text-muted-foreground">{course.title}</p>
              <h1 className="text-lg font-semibold text-foreground line-clamp-1">
                {selectedLesson.title}
              </h1>
            </div>
          </div>
          <Suspense
            fallback={
              <div className="w-44 hidden sm:block space-y-1">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2 w-full" />
              </div>
            }
          >
            <TopBarProgress
              customerId={user.id}
              courseId={course.id}
              totalLessons={totalLessons}
            />
          </Suspense>
        </div>
        <Suspense key={selectedLesson.id} fallback={<LessonContentSkeleton />}>
          <LessonContentPanel
            courseId={course.id}
            courseSlug={slug}
            customerId={user.id}
            courseContent={courseContent}
            selectedLessonId={selectedLesson.id}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
