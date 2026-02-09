import { Suspense } from "react";
import Hero from "./_components/Hero";
import HeroSkeleton from "./_components/Hero/Skeleton";
import CoursesGrid from "./_components/CoursesGrid";
import CoursesGridSkeleton from "./_components/CoursesGrid/Skeleton";

const Page = () => {
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<CoursesGridSkeleton />}>
        <CoursesGrid />
      </Suspense>
    </>
  );
};

export default Page;
