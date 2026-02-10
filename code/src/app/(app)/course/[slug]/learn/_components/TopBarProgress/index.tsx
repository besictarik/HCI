type TopBarProgressProps = {
  completedCount: number;
  totalLessons: number;
};

const TopBarProgress = ({
  completedCount,
  totalLessons,
}: TopBarProgressProps) => {
  const progressPercent = totalLessons
    ? Math.round((completedCount / totalLessons) * 100)
    : 0;
  const segments = Array.from({ length: totalLessons }, (_, index) => ({
    key: index,
    completed: index < completedCount,
  }));

  return (
    <>
      <div className="sm:hidden text-xs font-medium text-muted-foreground">
        {completedCount}/{totalLessons}
      </div>

      <div className="hidden w-44 sm:block">
        <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span>
            {completedCount}/{totalLessons}
          </span>
        </div>
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${Math.max(totalLessons, 1)}, minmax(0, 1fr))`,
          }}
          aria-label={`Course progress ${progressPercent}%`}
        >
          {segments.map((segment) => (
            <span
              key={segment.key}
              className={`h-1.5 rounded-full transition-colors ${
                segment.completed ? "bg-black" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TopBarProgress;
