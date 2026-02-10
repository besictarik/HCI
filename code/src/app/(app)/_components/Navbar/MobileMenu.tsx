import { headers as getHeaders } from "next/headers";
import { getPayload } from "payload";
import config from "@/payload.config";
import MobileMenuClient from "./MobileMenu.client";

const MobileMenu = async () => {
  const headers = await getHeaders();
  const payload = await getPayload({ config: await config });
  const { user } = await payload.auth({ headers });
  const customer = user as { collection?: string; name?: string } | null;
  const isCustomer = customer?.collection === "customers";

  return (
    <MobileMenuClient
      isAuthenticated={isCustomer}
      name={customer?.name || "Customer"}
    />
  );
};

export default MobileMenu;
