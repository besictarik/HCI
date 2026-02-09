import { Skeleton } from "@/ui/skeleton";

const Loading = () => {
  return (
    <div className="w-full flex h-[calc(100vh-65px)]">
      <div className="hidden md:block w-80 border-r border-border bg-card p-4 space-y-3">
        <Skeleton className="h-6 w-44" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-16 border-b border-border px-4 flex items-center">
          <div className="space-y-2 w-full max-w-md">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <div className="mx-auto max-w-3xl space-y-4">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-10 w-40 mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
