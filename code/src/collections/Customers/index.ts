import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "@/access";

export const Customers: CollectionConfig = {
  slug: "customers",
  access: {
    admin: authenticated,
    create: anyone,
    // For now only CMS admins (users collection) can manage customer records.
    // Later we can replace this with customer self-access (owner-based rules).
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
};
