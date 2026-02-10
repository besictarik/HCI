import { Skeleton } from "@/ui/skeleton";

const CourseActionsSkeleton = () => {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Skeleton className="h-11 w-44" />
      <Skeleton className="h-11 w-40" />
    </div>
  );
};

export default CourseActionsSkeleton;
