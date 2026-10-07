/**
 * Which logos appear in the tech-stack carousel. The keys match the exports of
 * SkillLogos.jsx / logoMap.js. To add a skill:
 *   1. drop a PNG in src/assets/logos
 *   2. export it from SkillLogos.jsx and add it to logoMap.js
 *   3. add its key to a row below AND its label to SKILL_NAMES
 *
 * The carousel shows two rows. Each array below is one row.
 */
export const SKILL_ROWS = [
  [
    "react",
    "nextjs",
    "javascript",
    "typescript",
    "bootstrap",
    "css",
    "django",
    "figma",
  ],
  ["html", "mongodb", "postgresql", "postman", "mysql", "node", "git", "php"],
];

/**
 * Which way each row drifts while nobody is clicking: 'right' or 'left'.
 * First entry = first (top) row, second entry = second (bottom) row.
 */
export const ROW_DIRECTIONS = ["right", "left"];

/** The label printed under each logo. */
export const SKILL_NAMES = {
  react: "React",
  nextjs: "Next.js",
  javascript: "JavaScript",
  typescript: "TypeScript",
  bootstrap: "Bootstrap",
  css: "CSS",
  django: "Django",
  figma: "Figma",
  html: "HTML",
  mongodb: "MongoDB",
  postgresql: "PostgreSQL",
  postman: "Postman",
  mysql: "MySQL",
  node: "Node.js",
  git: "Git",
  php: "PHP",
};

/** Shown as text chips under the carousel for tools that have no logo file yet. */
export const EXTRA_SKILLS = ["Laravel", "Blade", "Java Swing", "Tailwind CSS"];
