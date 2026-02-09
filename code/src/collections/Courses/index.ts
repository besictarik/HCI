import type { CollectionConfig } from "payload";
import { authenticated } from "@/access";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const Courses: CollectionConfig = {
  slug: "courses",
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: ({ req }) => {
      if (req.user?.collection === "users") {
        return true;
      }

      return {
        status: {
          equals: "published",
        },
      };
    },
    update: authenticated,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "level", "price", "status"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (typeof value === "string" && value.length > 0) {
              return slugify(value);
            }

            if (typeof data?.title === "string" && data.title.length > 0) {
              return slugify(data.title);
            }

            return value;
          },
        ],
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "category",
          type: "text",
          required: true,
        },
        {
          name: "level",
          type: "text",
          required: true,
        },
        {
          name: "duration",
          type: "text",
          required: true,
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "instructor",
          type: "text",
          required: true,
        },
        {
          name: "price",
          type: "number",
          required: true,
          min: 0,
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "rating",
          type: "number",
          required: true,
          min: 0,
          max: 5,
          defaultValue: 4.5,
        },
        {
          name: "students",
          type: "number",
          required: true,
          min: 0,
          defaultValue: 0,
        },
        {
          name: "reviews",
          type: "number",
          required: true,
          min: 0,
          defaultValue: 0,
        },
      ],
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "fullDescription",
      type: "textarea",
      required: true,
    },
    {
      name: "instructorBio",
      type: "textarea",
      required: true,
    },
    {
      name: "prerequisites",
      type: "textarea",
      required: true,
    },
    {
      name: "learnings",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "contentModules",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "lessons",
          type: "array",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "duration",
              type: "text",
              required: true,
            },
            {
              name: "description",
              type: "textarea",
            },
            {
              name: "completed",
              type: "checkbox",
              defaultValue: false,
            },
          ],
        },
      ],
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Published",
          value: "published",
        },
      ],
    },
  ],
};
