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
    <div className="w-44 hidden sm:block">
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
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
  );
};

export default TopBarProgress;
