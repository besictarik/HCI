import { getPayload } from "payload";
import fs from "node:fs";
import path from "node:path";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

type SeedArticle = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  authorName: string;
  body: string;
  imageFile: string;
};

const articles: SeedArticle[] = [
  {
    title: "Learning How to Learn in 2026",
    slug: "learning-how-to-learn-in-2026",
    category: "Learning Strategy",
    excerpt:
      "A practical framework for building a study system that survives real schedules.",
    authorName: "Scholia Team",
    imageFile: "learning-how-to-learn-in-2026.png",
    body: `Start by separating goals from systems. Goals define direction, but systems define outcomes. Most students fail because they only plan outcomes and never design recurring behaviors.

Build a weekly loop with three parts: focused learning blocks, review blocks, and reflection. Focused blocks are for new material, review blocks are for memory consolidation, and reflection is where you decide what to adjust.

Keep each block short enough to start without friction. Consistency beats intensity over a semester.

Track what you finish, not what you intended. Your actual pattern is the best source of truth.`,
  },
  {
    title: "From Notes to Understanding",
    slug: "from-notes-to-understanding",
    category: "Study Skills",
    excerpt: "Why note-taking alone is not learning, and what to do instead.",
    authorName: "Scholia Team",
    imageFile: "from-notes-to-understanding.png",
    body: `Notes capture information, but understanding requires transformation. If your process ends at writing, you have storage without retrieval.

After each lecture, convert notes into five questions. If you cannot answer them without looking, mark the weak areas immediately.

Then explain the topic in simple language. If your explanation is vague, your understanding is shallow.

Finally, create one small example that applies the concept. Application is where abstraction becomes usable knowledge.`,
  },
  {
    title: "Building a Portfolio While You Study",
    slug: "building-a-portfolio-while-you-study",
    category: "Career",
    excerpt:
      "Turn coursework into a portfolio without adding another full workload.",
    authorName: "Scholia Team",
    imageFile: "building-a-portfolio-while-you-study.png",
    body: `You do not need separate portfolio projects from day one. Start by packaging assignments better.

For each assignment, write a short project note: problem, constraints, decisions, and result. Recruiters care about reasoning, not just screenshots.

Keep before-and-after snapshots. Show one thing you improved and why.

Prefer fewer projects with clear depth over many unfinished demos.`,
  },
  {
    title: "Avoiding Burnout During Semester Peaks",
    slug: "avoiding-burnout-during-semester-peaks",
    category: "Wellbeing",
    excerpt:
      "A workload strategy for high-pressure weeks without sacrificing recovery.",
    authorName: "Scholia Team",
    imageFile: "avoiding-burnout-during-semester-peaks.png",
    body: `Burnout often looks like productivity at first: more hours, less quality, no recovery. The fix is capacity management, not motivation.

During peak weeks, reduce optional complexity. Use simpler deliverables, tighter scopes, and earlier deadlines for yourself.

Protect sleep first. Cognitive performance collapses long before you feel it.

Use a must-should-could list daily. Only commit to must-items before noon.`,
  },
  {
    title: "AI Tools as Study Partners, Not Shortcuts",
    slug: "ai-tools-as-study-partners-not-shortcuts",
    category: "Technology",
    excerpt:
      "Use AI to improve learning quality while keeping your own thinking in the loop.",
    authorName: "Scholia Team",
    imageFile: "ai-tools-as-study-partners-not-shortcuts.png",
    body: `AI is most useful when it supports process, not when it replaces effort. Use it to generate practice questions, explain alternative approaches, and critique your drafts.

A useful pattern is attempt first, AI second. Always produce your own version before asking for help.

Ask AI to challenge your assumptions. Request counterexamples and edge cases.

Keep final decisions and wording yours. Ownership is part of learning.`,
  },
  {
    title: "What Makes an Online Course Actually Effective",
    slug: "what-makes-an-online-course-actually-effective",
    category: "Product",
    excerpt:
      "The design patterns behind courses students complete instead of abandon.",
    authorName: "Scholia Team",
    imageFile: "what-makes-an-online-course-actually-effective.png",
    body: `Completion depends less on content quantity and more on progression clarity. Learners finish when next steps are obvious.

Strong courses use short modules, visible milestones, and immediate practice tasks.

Feedback loops matter. Learners should know quickly if they understood a concept.

Friction must be intentional. Difficulty should come from learning tasks, not navigation or unclear instructions.`,
  },
];

const toLexical = (value: string) => {
  const paragraphs = value
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: paragraphs.map((paragraph) => ({
        type: "paragraph",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        textFormat: 0,
        textStyle: "",
        children: [
          {
            type: "text",
            text: paragraph,
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            version: 1,
          },
        ],
      })),
    },
  };
};

const imagesDir = path.resolve(process.cwd(), "agents/docs/ArticleImages");

const upsertMedia = async (
  payload: any,
  imageFile: string,
  alt: string
): Promise<string | null> => {
  const imagePath = path.join(imagesDir, imageFile);

  if (!fs.existsSync(imagePath)) {
    console.warn(`Image not found: ${imagePath}`);
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
    data: {
      alt,
    },
    filePath: imagePath,
  });

  return created.id;
};

const run = async () => {
  const { default: config } = await import("../src/payload.config");
  const payload = (await getPayload({ config: await config })) as any;
  let created = 0;
  let updated = 0;

  for (const article of articles) {
    const existing = await payload.find({
      collection: "articles",
      where: {
        slug: {
          equals: article.slug,
        },
      },
      limit: 1,
      depth: 0,
    });

    const data = {
      title: article.title,
      slug: article.slug,
      category: article.category,
      excerpt: article.excerpt,
      authorName: article.authorName,
      content: toLexical(article.body),
      coverImage: await upsertMedia(payload, article.imageFile, article.title),
      status: "published",
      publishedAt: new Date().toISOString(),
    };

    if (existing.docs.length > 0) {
      await payload.update({
        collection: "articles",
        id: existing.docs[0].id,
        data,
      });
      updated += 1;
      continue;
    }

    await payload.create({
      collection: "articles",
      data,
    });
    created += 1;
  }

  console.log(`Seed complete. Created: ${created}, Updated: ${updated}`);
};

run()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("Failed to seed articles:", error);
    process.exit(1);
  });
