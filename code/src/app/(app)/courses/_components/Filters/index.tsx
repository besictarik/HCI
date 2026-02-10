"use client";

import { use, useOptimistic, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

type FiltersProps = {
  optionsPromise: Promise<{
    categories: string[];
  }>;
};

const Filters = ({ optionsPromise }: FiltersProps) => {
  const { categories } = use(optionsPromise);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const [optimisticFilters, setOptimisticFilters] = useOptimistic(
    { q, category },
    (_current, next: { q: string; category: string }) => next
  );

  const applyFilters = (next: { q: string; category: string }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (next.q.trim()) {
      params.set("q", next.q.trim());
    } else {
      params.delete("q");
    }

    if (next.category) {
      params.set("category", next.category);
    } else {
      params.delete("category");
    }

    params.delete("page");

    startTransition(() => {
      setOptimisticFilters(next);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    });
  };

  const handleSearchChange = (value: string) => {
    applyFilters({
      q: value,
      category: optimisticFilters.category,
    });
  };

  const handleCategoryChange = (value: string) => {
    applyFilters({
      q: optimisticFilters.q,
      category: value,
    });
  };

  return (
    <section className="pt-8 pb-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <Input
            value={optimisticFilters.q}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Search by title, description, or instructor"
            className="w-full"
          />

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant={optimisticFilters.category ? "outline" : "default"}
              size="sm"
              disabled={isPending}
              onClick={() => handleCategoryChange("")}
            >
              All
            </Button>
            {categories.map((item) => (
              <Button
                key={item}
                type="button"
                size="sm"
                variant={optimisticFilters.category === item ? "default" : "outline"}
                disabled={isPending}
                onClick={() => handleCategoryChange(item)}
              >
                {item}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-sm">
            {(optimisticFilters.q || optimisticFilters.category) ? (
              <Link className="text-primary hover:underline" href="/courses">
                Reset filters
              </Link>
            ) : (
              <span className="text-muted-foreground">Browse by keyword or category</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filters;
