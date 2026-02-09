import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { getPayload } from "payload";

const require = createRequire(import.meta.url);
const { loadEnvConfig } = require("@next/env");
loadEnvConfig(process.cwd());

type SeedLesson = {
  title: string;
  duration: string;
  description?: string;
  completed?: boolean;
};

type SeedModule = {
  title: string;
  lessons: SeedLesson[];
};

type SeedCourse = {
  title: string;
  slug: string;
  category: string;
  level: string;
  duration: string;
  instructor: string;
  instructorBio: string;
  price: number;
  rating: number;
  students: number;
  reviews: number;
  description: string;
  fullDescription: string;
  prerequisites: string;
  learnings: string[];
  modules: SeedModule[];
  imageFile: string;
};

const courses: SeedCourse[] = [
  {
    title: "Web Development Fundamentals",
    slug: "web-development-fundamentals",
    category: "Web Development",
    level: "Beginner",
    duration: "8 weeks",
    instructor: "Mila Thompson",
    instructorBio:
      "Mila is a full-stack developer and mentor with 9 years of teaching experience in practical web fundamentals.",
    price: 49,
    rating: 4.8,
    students: 2500,
    reviews: 450,
    description:
      "Learn the core building blocks of the web and ship your first complete project.",
    fullDescription:
      "This course walks through HTML, CSS, and JavaScript fundamentals with guided projects. By the end, learners can build and deploy a responsive multi-page website using modern best practices.",
    prerequisites: "Basic computer literacy.",
    learnings: [
      "Build semantic pages with HTML",
      "Design responsive layouts with CSS",
      "Add interactivity with JavaScript",
      "Deploy a basic web project",
    ],
    modules: [
      {
        title: "Getting Started",
        lessons: [
          { title: "Course Orientation", duration: "6 min", completed: true },
          { title: "Tool Setup", duration: "14 min", completed: true },
        ],
      },
      {
        title: "HTML and Structure",
        lessons: [
          { title: "Core HTML Elements", duration: "22 min" },
          { title: "Accessible Markup", duration: "18 min" },
        ],
      },
    ],
    imageFile: "web-development-fundamentals.png",
  },
  {
    title: "Advanced JavaScript",
    slug: "advanced-javascript",
    category: "Programming",
    level: "Intermediate",
    duration: "10 weeks",
    instructor: "Noah Reed",
    instructorBio:
      "Noah specializes in JavaScript performance and architecture, with 12 years of production experience.",
    price: 59,
    rating: 4.9,
    students: 1800,
    reviews: 390,
    description:
      "Go beyond basics with async patterns, architecture, and debugging strategies.",
    fullDescription:
      "A deep dive into JavaScript internals, async flows, closures, modules, and maintainable patterns. Includes production-style exercises and code review style walkthroughs.",
    prerequisites: "Comfort with JavaScript basics and DOM.",
    learnings: [
      "Master async JavaScript patterns",
      "Understand closures and scope deeply",
      "Structure large JS codebases",
      "Debug complex runtime issues",
    ],
    modules: [
      {
        title: "Language Internals",
        lessons: [
          { title: "Execution Context", duration: "20 min", completed: true },
          { title: "Closures in Practice", duration: "24 min" },
        ],
      },
      {
        title: "Async and Concurrency",
        lessons: [
          { title: "Promises and Chaining", duration: "19 min" },
          { title: "Async/Await Pitfalls", duration: "21 min" },
        ],
      },
    ],
    imageFile: "advanced-javascript.png",
  },
  {
    title: "React and Next.js Mastery",
    slug: "react-and-nextjs-mastery",
    category: "Web Development",
    level: "Intermediate",
    duration: "12 weeks",
    instructor: "Aria Patel",
    instructorBio:
      "Aria builds large-scale React platforms and teaches production-grade frontend architecture.",
    price: 69,
    rating: 4.7,
    students: 3200,
    reviews: 620,
    description:
      "Build modern React apps and production-ready Next.js experiences from scratch.",
    fullDescription:
      "Covers React composition, routing, server/client boundaries, data fetching, and deployment workflows with practical feature-driven projects.",
    prerequisites: "HTML/CSS/JS fundamentals and basic React familiarity.",
    learnings: [
      "Design reusable React component systems",
      "Use Next.js App Router effectively",
      "Handle async data and loading states",
      "Deploy production-ready applications",
    ],
    modules: [
      {
        title: "React Foundations",
        lessons: [
          { title: "Component Composition", duration: "17 min", completed: true },
          { title: "State and Effects", duration: "26 min" },
        ],
      },
      {
        title: "Next.js App Router",
        lessons: [
          { title: "Layouts and Routing", duration: "23 min" },
          { title: "Server Components", duration: "24 min" },
        ],
      },
    ],
    imageFile: "react-and-nextjs-mastery.png",
  },
  {
    title: "UX Research and Product Thinking",
    slug: "ux-research-and-product-thinking",
    category: "Design",
    level: "Beginner",
    duration: "6 weeks",
    instructor: "Lena Morris",
    instructorBio:
      "Lena is a product designer focused on user research, journey mapping, and evidence-based decisions.",
    price: 45,
    rating: 4.6,
    students: 1400,
    reviews: 210,
    description:
      "Learn practical UX research methods and product framing for real-world teams.",
    fullDescription:
      "From problem framing to interviews and synthesis, this course teaches students to turn user insight into product decisions with confidence.",
    prerequisites: "No prior UX background required.",
    learnings: [
      "Plan lightweight user research studies",
      "Run effective interviews",
      "Synthesize findings into themes",
      "Connect insights to product decisions",
    ],
    modules: [
      {
        title: "Research Basics",
        lessons: [
          { title: "Choosing the Right Method", duration: "16 min", completed: true },
          { title: "Interview Guide Design", duration: "18 min" },
        ],
      },
      {
        title: "Synthesis and Prioritization",
        lessons: [
          { title: "Affinity Mapping", duration: "22 min" },
          { title: "Decision Frameworks", duration: "20 min" },
        ],
      },
    ],
    imageFile: "ux-research-and-product-thinking.png",
  },
  {
    title: "Data Analysis for Non-Engineers",
    slug: "data-analysis-for-non-engineers",
    category: "Data",
    level: "Beginner",
    duration: "7 weeks",
    instructor: "Ethan Cole",
    instructorBio:
      "Ethan helps cross-functional teams use data for decision-making without overcomplicating tooling.",
    price: 52,
    rating: 4.5,
    students: 1600,
    reviews: 260,
    description:
      "Understand metrics, dashboards, and storytelling to make better product decisions.",
    fullDescription:
      "A practical introduction to KPI design, exploratory analysis, and communicating findings clearly to stakeholders.",
    prerequisites: "Comfort with spreadsheets.",
    learnings: [
      "Define useful product metrics",
      "Analyze trends with confidence",
      "Avoid common data interpretation mistakes",
      "Present insights clearly to teams",
    ],
    modules: [
      {
        title: "Metrics and Measurement",
        lessons: [
          { title: "Good vs Bad Metrics", duration: "15 min", completed: true },
          { title: "Cohorts and Funnels", duration: "19 min" },
        ],
      },
      {
        title: "Communicating Insights",
        lessons: [
          { title: "Narrative Structure", duration: "17 min" },
          { title: "Actionable Recommendations", duration: "16 min" },
        ],
      },
    ],
    imageFile: "data-analysis-for-non-engineers.png",
  },
  {
    title: "Career Prep: CV, Portfolio, and Interviews",
    slug: "career-prep-cv-portfolio-and-interviews",
    category: "Career",
    level: "Beginner",
    duration: "5 weeks",
    instructor: "Sophie Grant",
    instructorBio:
      "Sophie is a career coach for tech and design students, specializing in hiring preparation.",
    price: 39,
    rating: 4.7,
    students: 2000,
    reviews: 340,
    description:
      "Get interview-ready with a practical system for CVs, portfolios, and communication.",
    fullDescription:
      "Covers positioning, application materials, interview prep, and structured practice so learners can present their skills clearly and confidently.",
    prerequisites: "None.",
    learnings: [
      "Write a focused CV",
      "Present projects as outcomes",
      "Prepare for common interview rounds",
      "Communicate strengths with confidence",
    ],
    modules: [
      {
        title: "Application Materials",
        lessons: [
          { title: "CV Structure", duration: "14 min", completed: true },
          { title: "Portfolio Narratives", duration: "20 min" },
        ],
      },
      {
        title: "Interview Preparation",
        lessons: [
          { title: "Behavioral Questions", duration: "18 min" },
          { title: "Technical/Case Strategy", duration: "22 min" },
        ],
      },
    ],
    imageFile: "career-prep-cv-portfolio-and-interviews.png",
  },
];

const imagesDir = path.resolve(process.cwd(), "agents/docs/CourseImages");

const buildLessonDescription = (
  courseTitle: string,
  moduleTitle: string,
  lessonTitle: string
) =>
  `In this lesson from "${courseTitle}", you will work through "${lessonTitle}" in the "${moduleTitle}" module. You will learn the core idea, see practical examples, and leave with clear next steps you can apply immediately in your own project work.`;

const upsertMedia = async (
  payload: any,
  imageFile: string,
  alt: string
): Promise<number | null> => {
  const imagePath = path.join(imagesDir, imageFile);

  if (!fs.existsSync(imagePath)) {
    console.warn(`Course image not found: ${imagePath}`);
    return null;
  }

  const existing = await payload.find({
    collection: "media",
    where: {
      filename: {
        equals: imageFile,
      },
    },
    limit: 1,
    depth: 0,
  });

  if (existing.docs.length > 0) {
    return existing.docs[0].id;
  }

  const created = await payload.create({
    collection: "media",
    data: { alt },
    filePath: imagePath,
  });

  return created.id;
};

const run = async () => {
  const { default: config } = await import("../src/payload.config");
  const payload = (await getPayload({ config: await config })) as any;
  let created = 0;
  let updated = 0;

  for (const course of courses) {
    const existing = await payload.find({
      collection: "courses",
      where: {
        slug: {
          equals: course.slug,
        },
      },
      limit: 1,
      depth: 0,
    });

    const coverImage = await upsertMedia(payload, course.imageFile, course.title);

    const data = {
      title: course.title,
      slug: course.slug,
      category: course.category,
      level: course.level,
      duration: course.duration,
      instructor: course.instructor,
      instructorBio: course.instructorBio,
      price: course.price,
      rating: course.rating,
      students: course.students,
      reviews: course.reviews,
      description: course.description,
      fullDescription: course.fullDescription,
      prerequisites: course.prerequisites,
      learnings: course.learnings.map((value) => ({ value })),
      contentModules: course.modules.map((module) => ({
        title: module.title,
        lessons: module.lessons.map((lesson) => ({
          title: lesson.title,
          duration: lesson.duration,
          description:
            lesson.description ??
            buildLessonDescription(course.title, module.title, lesson.title),
          completed: Boolean(lesson.completed),
        })),
      })),
      ...(coverImage ? { coverImage } : {}),
      status: "published",
    };

    if (existing.docs.length > 0) {
      await payload.update({
        collection: "courses",
        id: existing.docs[0].id,
        data,
      });
      updated += 1;
      continue;
    }

    await payload.create({
      collection: "courses",
      data,
    });
    created += 1;
  }

  console.log(`Course seed complete. Created: ${created}, Updated: ${updated}`);
};

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Failed to seed courses:", error);
    process.exit(1);
  });
