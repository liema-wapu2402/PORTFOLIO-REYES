/**
 * Work experience + organizations. Edit freely.
 *
 * ORDER: the arrays are shown exactly as typed, top to bottom.
 * Put the newest entry first.
 *
 * EXPERIENCE fields
 *   id          (required) unique number
 *   role        (required) job title                  -> card title
 *   company     (required) employer                   -> line under the title
 *   type        (optional) e.g. 'Internship'          -> small label above the title
 *   period      (required) e.g. 'July 2024 - August 2024'
 *   points      (optional) bullet list of what you did
 *   current     (optional) true -> shows a "Current" badge
 *
 * ORGANIZATIONS fields
 *   id          (required) unique number
 *   name        (required) organization name
 *   short       (optional) abbreviation shown as a chip, e.g. 'ICpEP'
 *   roles       (required) [{ title, period, current? }], newest first
 */
export const EXPERIENCE = [
  {
    id: 1,
    role: "Data Analyst / Report Writer",
    company: "One Document Corporation",
    type: "Full-time",
    period: "Sept 17, 2025 - Present",
    points: [
      "Manage and optimize databases to ensure accuracy and efficiency.",
      "Integrate data systems and generate reports using full-stack development tools.",
    ],
    current: true,
  },
  {
    id: 2,
    role: "Web Developer",
    company: "One Document Corporation",
    type: "Internship",
    period: "July 2024 - August 2024",
    points: [
      "Developed and maintained dynamic websites, handling both front-end and back-end development for various companies and institutions.",
      "Gained hands-on experience managing large-scale data using large database systems.",
      "Trained in modern web technologies, including Laravel, to improve efficiency and scalability in web development.",
    ],
    current: false,
  },
];

export const ORGANIZATIONS = [
  {
    id: 1,
    name: "Rotaract Club of Tiaong Transforming New Gen",
    short: "RACTTNG",
    roles: [
      { title: "Foundations Director", period: "2025-2026", current: true },
      { title: "Club Service Director", period: "2024-2025" },
      {
        title: "Project Chairperson, EduAksyon Year 3",
        period: "2023-2024",
      },
      { title: "Secretariat Director", period: "2023-2024" },
      { title: "Member", period: "2021-2023" },
    ],
  },
  {
    id: 2,
    name: "Institute of Computer Engineers of the Philippines",
    short: "ICpEP",
    roles: [
      { title: "Registered Member", period: "2024-2025" },
      { title: "Registered Member", period: "2022-2023" },
    ],
  },
];
