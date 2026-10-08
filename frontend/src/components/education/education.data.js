/**
 * Education entries. Edit freely.
 *
 * ORDER: controlled by `id`, NOT by the order you type them in.
 * The timeline reads from the BOTTOM to the TOP:
 *   id: 1  -> bottom of the timeline
 *   higher id -> further up (the highest id appears at the very top)
 * Give every entry a different number.
 *
 * Fields:
 *   id          (required) number that sets the position (see above)
 *   school      (required) school name                       -> card title
 *   program     (required) level, e.g. 'College'             -> small label above the title
 *   period      (required) e.g. '2021-2025'                  -> shown beside / above the card
 *   course      (optional) strand or degree                  -> highlighted line under the title
 *   note        (optional) one short sentence ('' hides it)
 *   highlights  (optional) small tags at the bottom, e.g. subjects
 *   current     (optional) true -> shows a "Current" badge on that entry
 */
export const EDUCATION = [
  {
    id: 1,
    school: "Recto Memorial National High School",
    program: "Senior High School",
    period: "2019-2021",
    course: "Science, Technology, Engineering, and Mathematics (STEM) Strand",
    note: "",
    highlights: ["Object-Oriented Programming"],
    current: false,
  },

  {
    id: 2,
    school: "Technical Education and Skills Development Authority (TESDA)",
    program: "Upskilling",
    period: "2024",
    course: "Certificates of Completion",
    note: "",
    highlights: [
      "Developing Designs for User Interface",
      "SMART Android Mobile Apps Development for Beginners",
      "Maintaining Computer Systems and Networks",
    ],
    current: false,
  },

  {
    id: 3,
    school: "Cisco Networking Academy",
    program: "Upskilling",
    period: "2024",
    course: "Certificates of Course Completion",
    note: "",
    highlights: [
      "Data Analytics Essentials",
      "Computer Hardware Basics",
      "Networking Devices and Initial Configuration",
    ],
    current: false,
  },

  {
    id: 4,
    school: "Southern Luzon State University - Main Campus",
    program: "College",
    period: "2021-2025",
    course: "Bachelor of Science in Computer Engineering",
    note: "Completed July 31, 2025.",
    highlights: [
      "Embedded Systems",
      "Database Management",
      "Fullstack Development",
    ],
    current: false,
  },
];

/**
 * Optional certifications. Leave the array empty ([]) and the
 * "Certifications" block is hidden. Example entry:
 *   { title: 'Course name', issuer: 'Organisation', year: '2025' }
 */
export const CERTIFICATIONS = [
  {
    title: "Initiate: Introduction to Web and System Administration",
    issuer: "Certificate of Participation",
    year: "2025",
  },
  {
    title: "Boot, Break, Fix, Repeat: The Art of Mastering Computer Systems",
    issuer: "Certificate of Participation",
    year: "2025",
  },
  {
    title:
      "The Digital Workforce: Thriving in the Industry as a Computer Engineer",
    issuer: "DICT",
    year: "2025",
  },
  {
    title:
      "From Concept to Creation: 3D Designing, Modeling, and Printing for Hardware Development",
    issuer: "EvTech Company",
    year: "2025",
  },
  {
    title: "Behind the Screen: A Threat Analyst's Path to Malware Defense",
    issuer: "Trend Micro",
    year: "2025",
  },
];
