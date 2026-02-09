import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "@/access";

export const Media: CollectionConfig = {
  slug: "media",
  defaultPopulate: { id: true, url: true, filename: true },
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
