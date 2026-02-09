import { headers as getHeaders } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import Hero from "./_components/Hero";
import CoursesGrid from "./_components/CoursesGrid";

const Page = async () => {
  const headers = await getHeaders();
  const payload = await getPayload({ config: await config });
  const { user } = await payload.auth({ headers });
  const isCustomer =
    (user as { collection?: string } | null)?.collection === "customers";

  if (!isCustomer) {
    redirect("/login?redirect=%2Faccount");
  }

  return (
    <>
      <Hero />
      <CoursesGrid />
    </>
  );
};

export default Page;
