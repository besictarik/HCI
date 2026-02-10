import type { Payload } from "payload";
import { hasCourseEnrollment } from "@/lib/data/enrollments";

type CourseAccessRequest = {
  user?: { collection?: string; id?: number | string } | null;
  query?: Record<string, unknown>;
  payload: Payload;
};

export const getCourseAccessHandler = async (req: CourseAccessRequest) => {
  const user = req.user;

  if (user?.collection !== "customers" || !user.id) {
    return Response.json({
      isCustomer: false,
      isEnrolled: false,
    });
  }

  const courseIdQuery = req.query?.courseId;
  const courseId =
    typeof courseIdQuery === "string"
      ? courseIdQuery
      : Array.isArray(courseIdQuery) && typeof courseIdQuery[0] === "string"
        ? courseIdQuery[0]
        : null;

  if (!courseId) {
    return Response.json(
      {
        message: "Missing required query param: courseId",
      },
      {
        status: 400,
      }
    );
  }

  const isEnrolled = await hasCourseEnrollment({
    customerId: user.id,
    courseId,
    payload: req.payload,
  });

  return Response.json({
    isCustomer: true,
    isEnrolled,
  });
};
