import { Skeleton } from "@/ui/skeleton";

const FiltersSkeleton = () => {
  return (
    <section className="pt-8 pb-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <Skeleton className="h-9 lg:col-span-2" />
          <Skeleton className="h-9" />
          <div className="lg:col-span-3 flex items-center gap-3">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FiltersSkeleton;
