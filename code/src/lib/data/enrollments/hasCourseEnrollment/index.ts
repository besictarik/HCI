import { getPayload, type Payload } from "payload";
import config from "@/payload.config";

type EnrollmentCheckParams = {
  customerId: number | string;
  courseId: number | string;
  payload?: Payload;
};

export const hasCourseEnrollment = async ({
  customerId,
  courseId,
  payload,
}: EnrollmentCheckParams): Promise<boolean> => {
  const payloadClient = payload ?? (await getPayload({ config: await config }));

  const { totalDocs } = await payloadClient.find({
    collection: "enrollments",
    where: {
      and: [
        {
          customer: {
            equals: customerId,
          },
        },
        {
          course: {
            equals: courseId,
          },
        },
        {
          status: {
            equals: "active",
          },
        },
      ],
    },
    limit: 1,
    depth: 0,
  });

  return totalDocs > 0;
};
