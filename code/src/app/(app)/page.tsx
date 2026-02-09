import Hero from "./_components/Hero";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@/payload.config";

type HomeGlobal = {
  hero?: {
    title?: string | null;
    description?: string | null;
    primaryCtaLabel?: string | null;
    primaryCtaHref?: string | null;
    secondaryCtaLabel?: string | null;
    secondaryCtaHref?: string | null;
  } | null;
};

const getHome = unstable_cache(
  async (): Promise<HomeGlobal> => {
    const payload = (await getPayload({ config: await config })) as any;
    return payload.findGlobal({
      slug: "home",
    });
  },
  ["home:global"],
  { tags: ["home"] }
);

export default async function Home() {
  const data = await getHome();
  const hero = data.hero || {};
  const {
    title,
    description,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
  } = hero;

  if (
    !title ||
    !description ||
    !primaryCtaLabel ||
    !primaryCtaHref ||
    !secondaryCtaLabel ||
    !secondaryCtaHref
  ) {
    throw new Error("Home global is missing required hero fields.");
  }

  return (
    <>
      <Hero
        title={title}
        description={description}
        primaryCtaLabel={primaryCtaLabel}
        primaryCtaHref={primaryCtaHref}
        secondaryCtaLabel={secondaryCtaLabel}
        secondaryCtaHref={secondaryCtaHref}
      />
    </>
  );
}
