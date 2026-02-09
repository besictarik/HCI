import type { GlobalConfig } from "payload";
import { authenticated } from "@/access";
import { revalidateTag } from "next/cache";

export const Home: GlobalConfig = {
  slug: "home",
  access: {
    read: () => true,
    update: authenticated,
  },
  hooks: {
    afterChange: [
      async () => {
        revalidateTag("home");
      },
    ],
  },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
        {
          type: "row",
          fields: [
            {
              name: "primaryCtaLabel",
              type: "text",
              required: true,
            },
            {
              name: "primaryCtaHref",
              type: "text",
              required: true,
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "secondaryCtaLabel",
              type: "text",
              required: true,
            },
            {
              name: "secondaryCtaHref",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
