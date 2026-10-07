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
    school: "TESDA Online Program",
    program: "Upskilling",
    period: "2025",
    course: "Technical-Vocational Education and Training (TVET)",
    note: "",
    highlights: ["Object-Oriented Programming"],
    current: false,
  },

  {
    id: 3,
    school: "Cisco Networking Academy",
    program: "Upskilling",
    period: "2025",
    course: "Cisco Certified Network Associate (CCNA)",
    note: "",
    highlights: ["Object-Oriented Programming"],
    current: false,
  },

  {
    id: 4,
    school: "Southern Luzon State University",
    program: "College",
    period: "2021-2025",
    course: "Bachelor of Science in Computer Engineering",
    note: "",
    highlights: ["Object-Oriented Programming"],
    current: false,
  },
];

/**
 * Optional certifications. Leave the array empty ([]) and the
 * "Certifications" block is hidden. Example entry:
 *   { title: 'Course name', issuer: 'Organisation', year: '2025' }
 */
export const CERTIFICATIONS = [];
