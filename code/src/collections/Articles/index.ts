import type { CollectionConfig } from "payload";
import { authenticated } from "@/access";
import { revalidateTag } from "next/cache";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const Articles: CollectionConfig = {
  slug: "articles",
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
    defaultColumns: ["title", "status", "category", "publishedAt"],
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc }) => {
        revalidateTag("articles");
        const slug = typeof doc?.slug === "string" ? doc.slug : null;
        const prevSlug =
          previousDoc && typeof previousDoc.slug === "string"
            ? previousDoc.slug
            : null;

        if (slug) {
          revalidateTag(`article:${slug}`);
        }

        if (prevSlug && prevSlug !== slug) {
          revalidateTag(`article:${prevSlug}`);
        }
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        revalidateTag("articles");
        const slug = typeof doc?.slug === "string" ? doc.slug : null;

        if (slug) {
          revalidateTag(`article:${slug}`);
        }
      },
    ],
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
      name: "excerpt",
      type: "textarea",
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "category",
      type: "text",
      defaultValue: "General",
    },
    {
      name: "authorName",
      type: "text",
      defaultValue: "Scholia Team",
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
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
