"use server";

import { headers as getHeaders } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import { hasCourseEnrollment } from "@/lib/data/enrollments";

type ToggleProgressParams = {
  courseId: number | string;
  courseSlug: string;
  lessonId: string;
  completed: boolean;
};

export const toggleLessonProgressAction = async ({
  courseId,
  courseSlug,
  lessonId,
  completed,
}: ToggleProgressParams) => {
  const normalizedCourseId =
    typeof courseId === "string" ? Number(courseId) : courseId;

  if (!Number.isFinite(normalizedCourseId) || !lessonId.trim()) {
    redirect(`/course/${courseSlug}`);
  }

  const payload = await getPayload({ config: await config });
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });
  const isCustomer =
    (user as { collection?: string; id?: number | string } | null)?.collection ===
    "customers";

  if (!isCustomer || !user?.id) {
    redirect(
      `/login?redirect=${encodeURIComponent(`/course/${courseSlug}/learn?lesson=${lessonId}`)}`
    );
  }

  const isEnrolled = await hasCourseEnrollment({
    customerId: user.id,
    courseId: normalizedCourseId,
    payload,
  });

  if (!isEnrolled) {
    redirect(`/course/${courseSlug}`);
  }

  const { docs } = await payload.find({
    collection: "lesson-progress",
    where: {
      and: [
        {
          customer: {
            equals: user.id,
          },
        },
        {
          course: {
            equals: normalizedCourseId,
          },
        },
        {
          lessonId: {
            equals: lessonId,
          },
        },
      ],
    },
    limit: 1,
    depth: 0,
  });

  const existing = docs[0] as { id?: number | string } | undefined;

  if (completed) {
    if (!existing) {
      await payload.create({
        collection: "lesson-progress",
        draft: false,
        data: {
          customer: user.id,
          course: normalizedCourseId,
          lessonId,
          uniqueKey: `${user.id}:${normalizedCourseId}:${lessonId}`,
          completedAt: new Date().toISOString(),
        },
      });
    }
  } else if (existing?.id) {
    await payload.delete({
      collection: "lesson-progress",
      id: existing.id,
    });
  }
};
