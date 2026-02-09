import Link from "next/link";
import { Suspense } from "react";
import AuthControls from "./AuthControls";
import AuthControlsSkeleton from "./AuthControls/skeleton";
import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-primary"
          >
            <div className="h-8 w-8 rounded bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              S
            </div>
            <span className="hidden sm:inline">Scholia</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLinks />
            <Suspense fallback={<AuthControlsSkeleton />}>
              <AuthControls />
            </Suspense>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
