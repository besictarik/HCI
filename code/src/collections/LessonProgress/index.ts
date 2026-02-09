import type { CollectionConfig } from "payload";
import { authenticated } from "@/access";
import { revalidateTag } from "next/cache";

const getRelationId = (value: unknown): string | number | null => {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  if (value && typeof value === "object") {
    const id = (value as { id?: unknown }).id;
    if (typeof id === "string" || typeof id === "number") {
      return id;
    }
  }

  return null;
};

export const LessonProgress: CollectionConfig = {
  slug: "lesson-progress",
  access: {
    admin: authenticated,
    create: ({ req }) => {
      if (req.user?.collection === "users") {
        return true;
      }

      return req.user?.collection === "customers";
    },
    delete: ({ req }) => {
      if (req.user?.collection === "users") {
        return true;
      }

      if (req.user?.collection === "customers") {
        return {
          customer: {
            equals: req.user.id,
          },
        };
      }

      return false;
    },
    read: ({ req }) => {
      if (req.user?.collection === "users") {
        return true;
      }

      if (req.user?.collection === "customers") {
        return {
          customer: {
            equals: req.user.id,
          },
        };
      }

      return false;
    },
    update: ({ req }) => req.user?.collection === "users",
  },
  admin: {
    useAsTitle: "lessonId",
    defaultColumns: ["customer", "course", "lessonId", "completedAt"],
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        const customerId = getRelationId(data?.customer);
        const courseId = getRelationId(data?.course);
        const lessonId =
          typeof data?.lessonId === "string" ? data.lessonId.trim() : "";

        if (customerId && courseId && lessonId) {
          return {
            ...data,
            uniqueKey: `${customerId}:${courseId}:${lessonId}`,
          };
        }

        return data;
      },
    ],
    afterChange: [
      async ({ doc }) => {
        const customerId = getRelationId(doc?.customer);
        if (customerId) {
          revalidateTag(`progress:${customerId}`);
        }
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        const customerId = getRelationId(doc?.customer);
        if (customerId) {
          revalidateTag(`progress:${customerId}`);
        }
      },
    ],
  },
  fields: [
    {
      name: "customer",
      type: "relationship",
      relationTo: "customers",
      required: true,
      index: true,
    },
    {
      name: "course",
      type: "relationship",
      relationTo: "courses",
      required: true,
      index: true,
    },
    {
      name: "lessonId",
      type: "text",
      required: true,
      index: true,
    },
    {
      name: "uniqueKey",
      type: "text",
      required: true,
      unique: true,
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: "completedAt",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
    },
  ],
};
