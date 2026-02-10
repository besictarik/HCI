import { Suspense } from "react";
import { getCourseFilterOptions } from "@/lib/data/courses";
import Hero from "./_components/Hero";
import CoursesGrid from "./_components/CoursesGrid";
import CoursesGridSkeleton from "./_components/CoursesGrid/skeleton";
import Filters from "./_components/Filters";
import FiltersSkeleton from "./_components/Filters/skeleton";

const Page = ({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
}) => {
  const filterOptionsPromise = getCourseFilterOptions();

  return (
    <>
      <Hero />
      <Suspense fallback={<FiltersSkeleton />}>
        <Filters optionsPromise={filterOptionsPromise} />
      </Suspense>
      <Suspense fallback={<CoursesGridSkeleton />}>
        <CoursesGrid searchParamsPromise={searchParams} />
      </Suspense>
    </>
  );
};

export default Page;
