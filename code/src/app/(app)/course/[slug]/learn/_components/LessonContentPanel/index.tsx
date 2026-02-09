import { CourseContent } from "@/lib/data/courses/types";
import { getCompletedLessonsForCourse } from "@/lib/data/progress";
import { toggleLessonProgressAction } from "../../actions";
import LessonProgressToggle from "../LessonProgressToggle";
import { notFound } from "next/navigation";

type LessonContentPanelProps = {
  courseId: number | string;
  courseSlug: string;
  customerId: number | string;
  courseContent: CourseContent;
  selectedLessonId: string;
};

const LessonContentPanel = async ({
  courseId,
  courseSlug,
  customerId,
  courseContent,
  selectedLessonId,
}: LessonContentPanelProps) => {
  const lessons = courseContent.modules.flatMap((module) => module.lessons);
  const selectedLesson = lessons.find((lesson) => lesson.id === selectedLessonId);

  if (!selectedLesson) {
    notFound();
  }

  const selectedModule = courseContent.modules.find((module) =>
    module.lessons.some((lesson) => lesson.id === selectedLesson.id)
  );
  const completedLessonIds = await getCompletedLessonsForCourse({
    customerId,
    courseId,
  });
  const completedSet = new Set(completedLessonIds);
  const isSelectedLessonCompleted = completedSet.has(selectedLesson.id);
  const markLessonComplete = toggleLessonProgressAction.bind(null, {
    courseId,
    courseSlug,
    lessonId: selectedLesson.id,
    completed: true,
  });
  const markLessonIncomplete = toggleLessonProgressAction.bind(null, {
    courseId,
    courseSlug,
    lessonId: selectedLesson.id,
    completed: false,
  });

  return (
    <div className="flex-1 overflow-auto p-6 md:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {selectedModule ? selectedModule.title : "Lesson"} • {selectedLesson.duration}
          </p>
          <h2 className="text-3xl font-semibold text-foreground text-balance">
            {selectedLesson.title}
          </h2>
        </div>

        {selectedLesson.description ? (
          <p className="text-foreground/90 leading-7">{selectedLesson.description}</p>
        ) : (
          <p className="text-muted-foreground leading-7">
            Lesson content is not provided yet for this module. Add a lesson
            description in Payload Admin to display detailed learning material here.
          </p>
        )}
        <LessonProgressToggle
          initialCompleted={isSelectedLessonCompleted}
          markCompleteAction={markLessonComplete}
          markIncompleteAction={markLessonIncomplete}
        />
      </div>
    </div>
  );
};

export default LessonContentPanel;
