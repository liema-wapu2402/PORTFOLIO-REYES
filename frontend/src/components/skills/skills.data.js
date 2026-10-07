/**
 * Which logos appear in each marquee row. The keys match the exports of
 * SkillLogos.jsx. To add a skill: drop a PNG in src/assets/logos, export it from
 * SkillLogos.jsx, then add its key here.
 */
export const SKILL_ROWS = [
  ['react', 'nextjs', 'javascript', 'typescript', 'bootstrap', 'css', 'django', 'figma'],
  ['html', 'mongodb', 'postgresql', 'postman', 'mysql', 'node', 'git', 'php'],
];

/** Shown as text chips under the marquee for tools that have no logo file yet. */
export const EXTRA_SKILLS = ['Laravel', 'Blade', 'Java Swing', 'Tailwind CSS'];
