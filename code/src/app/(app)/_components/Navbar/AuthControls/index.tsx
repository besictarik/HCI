import Link from "next/link";
import { headers as getHeaders } from "next/headers";
import { getPayload } from "payload";
import { Button } from "@/ui/button";
import config from "@/payload.config";
import UserMenu from "./UserMenu";

const AuthControls = async () => {
  const headers = await getHeaders();
  const payload = await getPayload({ config: await config });
  const { user } = await payload.auth({ headers });
  const customer = user as { collection?: string; name?: string; email?: string } | null;
  const isCustomer = customer?.collection === "customers";

  if (isCustomer) {
    return (
      <UserMenu email={customer?.email || ""} name={customer?.name || "Customer"} />
    );
  }

  return (
    <Link href="/login" className="hidden md:inline-flex">
      <Button size="sm">Sign In</Button>
    </Link>
  );
};

export default AuthControls;
