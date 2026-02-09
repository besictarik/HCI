import { Skeleton } from "@/ui/skeleton";

const LessonContentSkeleton = () => {
  return (
    <div className="flex-1 overflow-auto p-6 md:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-52" />
          <Skeleton className="h-10 w-3/4" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton className="h-10 w-44" />
      </div>
    </div>
  );
};

export default LessonContentSkeleton;
