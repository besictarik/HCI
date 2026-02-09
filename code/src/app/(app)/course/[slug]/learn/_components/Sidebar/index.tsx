"use client";

import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { useOptimistic, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Course, CourseContent } from "@/lib/data/courses/types";

const Sidebar = ({
  course,
  courseContent,
  selectedLessonId,
  completedLessonIds = [],
}: {
  course: Course;
  courseContent: CourseContent;
  selectedLessonId: string;
  completedLessonIds?: string[];
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimisticSelectedLessonId, setOptimisticSelectedLessonId] = useOptimistic(
    selectedLessonId,
    (_current, nextLessonId: string) => nextLessonId
  );
  const completedSet = new Set(completedLessonIds);

  const handleLessonSelect = (lessonId: string) => {
    if (!lessonId || lessonId === optimisticSelectedLessonId) {
      return;
    }

    startTransition(() => {
      setOptimisticSelectedLessonId(lessonId);
      router.replace(`/course/${course.slug}/learn?lesson=${encodeURIComponent(lessonId)}`);
    });
  };

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
              <div key={module.id} className="rounded-md border border-border">
                <div className="font-semibold text-sm text-foreground p-3 bg-muted/50">
                  Module {module.id}: {module.title}
                </div>
                <div className="p-2 space-y-1">
                  {module.lessons.map((lesson) => {
                    const isActive = lesson.id === optimisticSelectedLessonId;
                    const isCompleted = completedSet.has(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => handleLessonSelect(lesson.id)}
                        aria-current={isActive ? "page" : undefined}
                        disabled={isPending}
                        className={`w-full text-left block rounded px-2 py-2 text-sm transition-colors ${
                          isActive
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        } ${isPending ? "cursor-wait" : ""}`}
                      >
                        <div className="flex items-start gap-2">
                          <div
                            className={`mt-0.5 inline-flex size-4 items-center justify-center rounded-full border ${
                              isCompleted
                                ? "border-black bg-black text-white"
                                : "border-border text-transparent"
                            }`}
                          >
                            <Check className="size-3" />
                          </div>
                          <div className="min-w-0">
                            <p className="line-clamp-2">{lesson.title}</p>
                            <p className="text-xs opacity-80 mt-0.5">{lesson.duration}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
