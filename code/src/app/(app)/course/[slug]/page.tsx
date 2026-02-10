import Hero from "./_components/Hero";
import { getCourse, getCourseContent, getPublishedCourseSlugs } from "@/lib/data/courses";
import { notFound } from "next/navigation";

export const dynamicParams = true;

export const generateStaticParams = async () => {
  const slugs = await getPublishedCourseSlugs();
  return slugs.map((slug) => ({ slug }));
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const course = await getCourse(slug);
  const courseContent = await getCourseContent(slug);

  if (!course) {
    notFound();
  }

  const totalLessons =
    courseContent?.modules.reduce(
      (lessonCount, module) => lessonCount + module.lessons.length,
      0
    ) ?? 0;

  return (
    <>
      <Hero course={course} />
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">About This Course</h2>
              <p className="text-muted-foreground leading-relaxed">
                {course.fullDescription}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">What You Will Learn</h2>
              <ul className="grid gap-2 text-muted-foreground">
                {course.learnings.map((item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className="grid grid-cols-[14px_1fr] items-start gap-2"
                  >
                    <span className="text-black leading-6">•</span>
                    <span className="leading-6">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">Prerequisites</h2>
              <p className="text-muted-foreground leading-relaxed">
                {course.prerequisites}
              </p>
            </div>
          </div>

          <aside className="rounded-lg border border-border bg-card p-5 h-fit space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Instructor</p>
              <p className="text-foreground font-medium">{course.instructor}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Students</p>
              <p className="text-foreground font-medium">{course.students} enrolled</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Curriculum</p>
              <p className="text-foreground font-medium">
                {courseContent?.modules.length ?? 0} modules • {totalLessons} lessons
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Instructor Bio</p>
              <p className="text-sm text-foreground leading-relaxed">
                {course.instructorBio}
              </p>
            </div>
          </aside>
        </div>
      </section>
      <section className="pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Course Content</h2>
          <div className="rounded-lg border border-border divide-y divide-border">
            {(courseContent?.modules ?? []).map((module) => (
              <div key={module.id} className="p-4 md:p-5">
                <p className="font-medium text-foreground">{module.title}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {module.lessons.length} lessons
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
