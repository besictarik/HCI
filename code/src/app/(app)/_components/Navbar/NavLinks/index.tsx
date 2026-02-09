"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NavLinks = () => {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isCourses = pathname.startsWith("/courses") || pathname.startsWith("/course");
  const isNews = pathname.startsWith("/news");

  return (
    <>
      <Link
        href="/"
        className={cn(
          "relative text-sm transition-colors pb-1",
          isHome
            ? "text-foreground after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-black"
            : "text-foreground/75 hover:text-foreground"
        )}
      >
        Home
      </Link>
      <Link
        href="/courses"
        className={cn(
          "relative text-sm transition-colors pb-1",
          isCourses
            ? "text-foreground after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-black"
            : "text-foreground/75 hover:text-foreground"
        )}
      >
        Courses
      </Link>
      <Link
        href="/news"
        className={cn(
          "relative text-sm transition-colors pb-1",
          isNews
            ? "text-foreground after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-black"
            : "text-foreground/75 hover:text-foreground"
        )}
      >
        News
      </Link>
    </>
  );
};

export default NavLinks;
