"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/ui/button";

type LessonProgressToggleProps = {
  initialCompleted: boolean;
  markCompleteAction: () => Promise<void>;
  markIncompleteAction: () => Promise<void>;
};

const LessonProgressToggle = ({
  initialCompleted,
  markCompleteAction,
  markIncompleteAction,
}: LessonProgressToggleProps) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticCompleted, setOptimisticCompleted] = useState(initialCompleted);

  useEffect(() => {
    setOptimisticCompleted(initialCompleted);
  }, [initialCompleted]);

  const handleClick = () => {
    const nextCompleted = !optimisticCompleted;
    setOptimisticCompleted(nextCompleted);

    startTransition(async () => {
      if (nextCompleted) {
        await markCompleteAction();
        return;
      }

      await markIncompleteAction();
    });
  };

  return (
    <div className="pt-2 flex items-center gap-3">
      <Button
        type="button"
        variant={optimisticCompleted ? "outline" : "default"}
        disabled={isPending}
        onClick={handleClick}
      >
        {isPending
          ? "Saving..."
          : optimisticCompleted
            ? "Mark as Incomplete"
            : "Mark as Complete"}
      </Button>
      <p className="text-sm text-muted-foreground">
        {optimisticCompleted ? "Completed" : "Not completed yet"}
      </p>
    </div>
  );
};

export default LessonProgressToggle;
