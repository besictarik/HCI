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

export const Enrollments: CollectionConfig = {
  slug: "enrollments",
  access: {
    admin: authenticated,
    create: ({ req }) => {
      if (req.user?.collection === "users") {
        return true;
      }

      return req.user?.collection === "customers";
    },
    delete: ({ req }) => req.user?.collection === "users",
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
    useAsTitle: "id",
    defaultColumns: ["customer", "course", "status", "acquiredAt"],
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        const customerId = getRelationId(doc?.customer);
        if (customerId) {
          revalidateTag(`enrollments:${customerId}`);
        }
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        const customerId = getRelationId(doc?.customer);
        if (customerId) {
          revalidateTag(`enrollments:${customerId}`);
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
      name: "status",
      type: "select",
      required: true,
      defaultValue: "active",
      options: [
        {
          label: "Active",
          value: "active",
        },
        {
          label: "Cancelled",
          value: "cancelled",
        },
      ],
    },
    {
      name: "acquiredAt",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
    },
  ],
};
