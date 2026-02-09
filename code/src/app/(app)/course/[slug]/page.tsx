import Hero from "./_components/Hero";
import { getCourse } from "@/lib/data/courses";

const Page = ({}: { params: Promise<{ slug: string }> }) => {
  const course = getCourse();
  return (
    <>
      <Hero course={course} />
    </>
  );
};

export default Page;
