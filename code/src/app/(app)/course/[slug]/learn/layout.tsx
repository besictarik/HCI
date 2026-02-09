import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@/payload.config";
import { getCurrentCustomer } from "@/lib/auth/getCurrentCustomer";
import { getCourse } from "@/lib/data/courses";
import { hasCourseEnrollment } from "@/lib/data/enrollments";

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const customer = await getCurrentCustomer();

  if (!customer?.id) {
    redirect(`/login?redirect=${encodeURIComponent(`/course/${slug}/learn`)}`);
  }

  const payload = await getPayload({ config: await config });
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  const isEnrolled = await hasCourseEnrollment({
    customerId: customer.id,
    courseId: course.id,
    payload,
  });

  if (!isEnrolled) {
    redirect(`/course/${slug}`);
  }

  return children;
};

export default Layout;
