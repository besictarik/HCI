"use client";

import { Menu } from "lucide-react";
import { Button } from "@/ui/button";

const LessonsMenuButton = () => {
  const handleClick = () => {
    window.dispatchEvent(new Event("open-lesson-sidebar"));
  };

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      className="md:hidden"
      onClick={handleClick}
    >
      <Menu className="size-4" />
      Lessons
    </Button>
  );
};

export default LessonsMenuButton;
