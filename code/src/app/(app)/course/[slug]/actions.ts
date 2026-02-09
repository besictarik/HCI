"use server";

import { headers as getHeaders } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import { hasCourseEnrollment } from "@/lib/data/enrollments";

const getCoursePath = (slug: string) => `/course/${slug}`;
const getLearnPath = (slug: string) => `/course/${slug}/learn`;

export const acquireCourseAction = async (
  courseId: number | string,
  courseSlug: string
) => {
  const normalizedCourseId =
    typeof courseId === "string" ? Number(courseId) : courseId;

  if (!Number.isFinite(normalizedCourseId)) {
    redirect(getCoursePath(courseSlug));
  }

  const payload = await getPayload({ config: await config });
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });
  const isCustomer =
    (user as { collection?: string; id?: number | string } | null)?.collection ===
    "customers";

  if (!isCustomer || !user?.id) {
    redirect(`/login?redirect=${encodeURIComponent(getCoursePath(courseSlug))}`);
  }

  const hasEnrollment = await hasCourseEnrollment({
    customerId: user.id,
    courseId: normalizedCourseId,
    payload,
  });

  if (!hasEnrollment) {
    await payload.create({
      collection: "enrollments",
      data: {
        customer: user.id,
        course: normalizedCourseId,
        status: "active",
        acquiredAt: new Date().toISOString(),
      },
    });
  }

  redirect(getLearnPath(courseSlug));
};
