import { getPayload, type Payload } from "payload";
import config from "@/payload.config";

type ProgressParams = {
  customerId: number | string;
  courseId: number | string;
  payload?: Payload;
};

type ProgressDoc = {
  lessonId?: string | null;
};

export const getCompletedLessonsForCourse = async ({
  customerId,
  courseId,
  payload,
}: ProgressParams): Promise<string[]> => {
  const payloadClient = payload ?? (await getPayload({ config: await config }));

  const { docs } = await payloadClient.find({
    collection: "lesson-progress",
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
      ],
    },
    limit: 1000,
    depth: 0,
  });

  return (docs as ProgressDoc[])
    .map((doc) => doc.lessonId)
    .filter((value): value is string => Boolean(value));
};
