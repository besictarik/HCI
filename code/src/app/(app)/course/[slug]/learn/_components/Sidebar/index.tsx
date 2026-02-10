"use client";

import Link from "next/link";
import { Check, ChevronRight, X } from "lucide-react";
import { useEffect, useOptimistic, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Course, CourseContent } from "@/lib/data/courses/types";
import { Button } from "@/ui/button";
import { cn } from "@/lib/utils";

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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [optimisticSelectedLessonId, setOptimisticSelectedLessonId] = useOptimistic(
    selectedLessonId,
    (_current, nextLessonId: string) => nextLessonId
  );
  const completedSet = new Set(completedLessonIds);

  useEffect(() => {
    const handleOpen = () => {
      setIsMobileOpen(true);
    };

    window.addEventListener("open-lesson-sidebar", handleOpen);

    return () => {
      window.removeEventListener("open-lesson-sidebar", handleOpen);
    };
  }, []);

  const handleLessonSelect = (lessonId: string) => {
    if (!lessonId || lessonId === optimisticSelectedLessonId) {
      return;
    }

    startTransition(() => {
      setOptimisticSelectedLessonId(lessonId);
      router.replace(`/course/${course.slug}/learn?lesson=${encodeURIComponent(lessonId)}`);
    });

    setIsMobileOpen(false);
  };

  const content = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between gap-2">
        <Link href={`/course/${course.slug}`} className="hover:text-primary transition-colors">
          <ChevronRight className="w-5 h-5 rotate-180" />
        </Link>
        <h2 className="text-sm font-semibold text-foreground flex-1 px-2 line-clamp-2">
          {course.title}
        </h2>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Close lesson navigation"
          className="md:hidden"
          onClick={() => setIsMobileOpen(false)}
        >
          <X className="size-4" />
        </Button>
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
  );

  return (
    <>
      <div className="hidden md:block md:w-80 md:border-r md:border-border md:bg-card">
        {content}
      </div>

      {isMobileOpen ? (
        <button
          type="button"
          aria-label="Close lesson navigation"
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      ) : null}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[84vw] max-w-xs border-r border-border bg-card transition-transform duration-300 md:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {content}
      </div>
    </>
  );
};

export default Sidebar;
