"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/ui/button";
import { cn } from "@/lib/utils";

type MobileMenuClientProps = {
  isAuthenticated: boolean;
  name: string;
};

const MobileMenuClient = ({ isAuthenticated, name }: MobileMenuClientProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const closeMenu = () => setOpen(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await fetch("/api/customers/logout", {
        method: "POST",
      });
    } finally {
      closeMenu();
      router.push("/login");
      router.refresh();
      setIsLoggingOut(false);
    }
  };

  const isHome = pathname === "/";
  const isCourses = pathname.startsWith("/courses") || pathname.startsWith("/course");
  const isNews = pathname.startsWith("/news");

  return (
    <div className="md:hidden">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((current) => !current)}
        className="relative"
      >
        <span className="relative block size-5">
          <Menu
            className={cn(
              "absolute inset-0 m-auto size-5 transition-opacity",
              open ? "opacity-0" : "opacity-100"
            )}
          />
          <X
            className={cn(
              "absolute inset-0 m-auto size-5 transition-opacity",
              open ? "opacity-100" : "opacity-0"
            )}
          />
        </span>
      </Button>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Close mobile menu"
            className="fixed inset-0 z-40 bg-black/30"
            onClick={closeMenu}
          />

          <div className="fixed inset-y-0 right-0 z-50 w-[84vw] max-w-xs border-l border-border bg-background px-4 py-[14px] shadow-lg">
            <div className="flex h-full flex-col gap-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Menu</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Close navigation menu"
                  onClick={closeMenu}
                >
                  <X className="size-5" />
                </Button>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors",
                    isHome ? "bg-accent text-foreground" : "text-foreground/80 hover:bg-accent"
                  )}
                >
                  Home
                </Link>
                <Link
                  href="/courses"
                  onClick={closeMenu}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors",
                    isCourses
                      ? "bg-accent text-foreground"
                      : "text-foreground/80 hover:bg-accent"
                  )}
                >
                  Courses
                </Link>
                <Link
                  href="/news"
                  onClick={closeMenu}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors",
                    isNews ? "bg-accent text-foreground" : "text-foreground/80 hover:bg-accent"
                  )}
                >
                  News
                </Link>
              </div>

              <div className="mt-auto border-t border-border pt-4">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <p className="truncate text-sm text-muted-foreground">Signed in as {name}</p>
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link href="/account" onClick={closeMenu}>
                        <User className="size-4" />
                        Account
                      </Link>
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      className="w-full justify-start"
                      disabled={isLoggingOut}
                      onClick={() => void handleLogout()}
                    >
                      <LogOut className="size-4" />
                      {isLoggingOut ? "Signing out..." : "Sign Out"}
                    </Button>
                  </div>
                ) : (
                  <Button asChild className="w-full">
                    <Link href="/login" onClick={closeMenu}>
                      Sign In
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default MobileMenuClient;
