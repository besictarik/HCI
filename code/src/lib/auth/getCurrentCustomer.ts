import { cache } from "react";
import { headers as getHeaders } from "next/headers";
import { getPayload } from "payload";
import config from "@/payload.config";

type CurrentCustomer = {
  id: number | string;
  email?: string;
  name?: string;
};

export const getCurrentCustomer = cache(async (): Promise<CurrentCustomer | null> => {
  const headers = await getHeaders();
  const payload = await getPayload({ config: await config });
  const { user } = await payload.auth({ headers });

  if ((user as { collection?: string } | null)?.collection !== "customers") {
    return null;
  }

  const customer = user as {
    id: number | string;
    email?: string;
    name?: string;
  };

  return {
    id: customer.id,
    email: customer.email,
    name: customer.name,
  };
});
