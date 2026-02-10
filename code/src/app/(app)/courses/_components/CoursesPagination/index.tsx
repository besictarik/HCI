import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { getCourses } from "@/lib/data/courses";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/ui/pagination";
import { buttonVariants } from "@/ui/button";
import { cn } from "@/lib/utils";
import LimitSelect from "./LimitSelect";

const ALLOWED_LIMITS = [3, 6, 9, 12, 24] as const;
const DEFAULT_LIMIT = 9;

const parsePage = (value?: string) => {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
};

const parseLimit = (value?: string) => {
  const parsed = Number.parseInt(value || "", 10);
  return ALLOWED_LIMITS.includes(parsed as (typeof ALLOWED_LIMITS)[number])
    ? parsed
    : DEFAULT_LIMIT;
};

const buildHref = ({
  page,
  limit,
  q,
  category,
}: {
  page: number;
  limit: number;
  q?: string;
  category?: string;
}) => {
  const params = new URLSearchParams();

  if (q?.trim()) {
    params.set("q", q.trim());
  }

  if (category?.trim()) {
    params.set("category", category.trim());
  }

  if (limit !== DEFAULT_LIMIT) {
    params.set("limit", String(limit));
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();
  return query ? `/courses?${query}` : "/courses";
};

const getVisiblePages = (currentPage: number, totalPages: number) => {
  const pages = new Set<number>([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);

  return [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
};

const CoursesPagination = async ({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{
    q?: string;
    category?: string;
    page?: string;
    limit?: string;
  }>;
}) => {
  const params = await searchParamsPromise;
  const page = parsePage(params.page);
  const limit = parseLimit(params.limit);
  const q = params.q?.trim() || undefined;
  const category = params.category?.trim() || undefined;
  const result = await getCourses({ q, category, page, limit });

  const visiblePages = getVisiblePages(result.page, result.totalPages);

  return (
    <section className="pb-10 md:pb-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show per page:</span>
          <LimitSelect value={limit} options={ALLOWED_LIMITS} />
        </div>

        <Pagination className="mx-0 w-auto justify-start md:justify-end">
          <PaginationContent>
            <PaginationItem>
              <Link
                href={buildHref({
                  page: Math.max(1, result.page - 1),
                  limit,
                  q,
                  category,
                })}
                scroll={true}
                aria-disabled={!result.hasPrevPage}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "default" }),
                  "gap-1 px-2.5 sm:pl-2.5",
                  !result.hasPrevPage && "pointer-events-none opacity-50"
                )}
              >
                <ChevronLeftIcon className="size-4" />
                <span className="hidden sm:block">Previous</span>
              </Link>
            </PaginationItem>

            {visiblePages.map((visiblePage, index) => {
              const previousPage = visiblePages[index - 1];
              const showEllipsis = previousPage && visiblePage - previousPage > 1;

              return (
                <PaginationItem key={visiblePage}>
                  {showEllipsis ? <PaginationEllipsis /> : null}
                  <Link
                    href={buildHref({
                      page: visiblePage,
                      limit,
                      q,
                      category,
                    })}
                    scroll={true}
                    aria-current={visiblePage === result.page ? "page" : undefined}
                    className={buttonVariants({
                      variant: visiblePage === result.page ? "outline" : "ghost",
                      size: "icon",
                    })}
                  >
                    {visiblePage}
                  </Link>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <Link
                href={buildHref({
                  page: Math.min(result.totalPages, result.page + 1),
                  limit,
                  q,
                  category,
                })}
                scroll={true}
                aria-disabled={!result.hasNextPage}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "default" }),
                  "gap-1 px-2.5 sm:pr-2.5",
                  !result.hasNextPage && "pointer-events-none opacity-50"
                )}
              >
                <span className="hidden sm:block">Next</span>
                <ChevronRightIcon className="size-4" />
              </Link>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default CoursesPagination;
