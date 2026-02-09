import { Skeleton } from "@/ui/skeleton";

const HeroSkeleton = () => {
  return (
    <section className="py-8 md:py-12 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-10 w-80 mb-3" />
        <Skeleton className="h-5 w-96 max-w-full" />
      </div>
    </section>
  );
};

export default HeroSkeleton;
