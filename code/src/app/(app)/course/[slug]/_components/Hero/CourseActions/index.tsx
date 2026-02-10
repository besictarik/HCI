"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { acquireCourseAction } from "../../../actions";
import { Button } from "@/ui/button";

type CourseActionsProps = {
  courseId: number | string;
  courseSlug: string;
};

type State =
  | { status: "loading" }
  | { status: "guest" }
  | { status: "customer"; isEnrolled: boolean };

const CourseActions = ({ courseId, courseSlug }: CourseActionsProps) => {
  const [state, setState] = useState<State>({ status: "loading" });
  const loginHref = `/login?redirect=${encodeURIComponent(`/course/${courseSlug}`)}`;
  const acquireCourseForSlug = useMemo(
    () => acquireCourseAction.bind(null, courseId, courseSlug),
    [courseId, courseSlug]
  );

  useEffect(() => {
    let cancelled = false;

    const resolveState = async () => {
      try {
        const accessResponse = await fetch(
          `/api/courses/access?courseId=${encodeURIComponent(String(courseId))}`,
          {
            method: "GET",
            cache: "no-store",
            credentials: "include",
          }
        );

        if (!accessResponse.ok) {
          if (!cancelled) {
            setState({ status: "guest" });
          }
          return;
        }

        const accessData = (await accessResponse.json()) as {
          isCustomer?: boolean;
          isEnrolled?: boolean;
        };

        if (!accessData.isCustomer) {
          if (!cancelled) {
            setState({ status: "guest" });
          }
          return;
        }

        if (!cancelled) {
          setState({
            status: "customer",
            isEnrolled: Boolean(accessData.isEnrolled),
          });
        }
      } catch {
        if (!cancelled) {
          setState({ status: "guest" });
        }
      }
    };

    void resolveState();

    return () => {
      cancelled = true;
    };
  }, [courseId]);

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {state.status === "loading" ? (
        <Button size="lg" disabled>
          Loading...
        </Button>
      ) : state.status === "customer" && state.isEnrolled ? (
        <Button asChild size="lg">
          <Link href={`/course/${courseSlug}/learn`}>Continue Learning</Link>
        </Button>
      ) : state.status === "customer" ? (
        <form action={acquireCourseForSlug}>
          <Button size="lg" type="submit">
            Acquire Course
          </Button>
        </form>
      ) : (
        <Button asChild size="lg">
          <Link href={loginHref}>Sign In to Acquire</Link>
        </Button>
      )}

      <Button asChild size="lg" variant="outline">
        <Link href="/courses">Browse Courses</Link>
      </Button>
    </div>
  );
};

export default CourseActions;
