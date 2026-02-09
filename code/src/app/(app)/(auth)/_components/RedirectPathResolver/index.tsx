"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

type RedirectPathResolverProps = {
  fallback?: string;
  onResolve: (value: string) => void;
};

const resolveRedirectPath = (value: string | null, fallback: string) => {
  if (!value) {
    return fallback;
  }

  if (!value.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }

  return value;
};

const RedirectPathResolver = ({
  fallback = "/",
  onResolve,
}: RedirectPathResolverProps) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const resolved = resolveRedirectPath(searchParams.get("redirect"), fallback);
    onResolve(resolved);
  }, [fallback, onResolve, searchParams]);

  return null;
};

export default RedirectPathResolver;
