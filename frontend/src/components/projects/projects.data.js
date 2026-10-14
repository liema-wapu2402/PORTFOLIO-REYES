import { SITE } from "@/data/site";

import project1Img from "@/assets/projects/project1.gif";
import project2Img from "@/assets/projects/project2.png";
import project3Img from "@/assets/projects/project3.png";
import project4Img from "@/assets/projects/project4.png";
import project5Img from "@/assets/projects/project5.gif";
import project6Img from "@/assets/projects/project6.png";

/**
 * Projects shown on the site (single source of truth: the old desktop and mobile
 * lists were duplicates and are now merged into this one).
 *
 * Fields
 *   title, description, tags[]  required
 *   imageUrl                    optional thumbnail (imported above)
 *   videoUrl                    optional preview clip, plays when the card is hovered
 *   liveUrl                     optional "Live site" link ('' or '#' hides it)
 *   repoUrl                     optional "Source" link  ('' or '#' hides it)
 */
export const PROJECTS = [
  {
    title: "AG Entertainment",
    description:
      "A full-stack web platform built with Laravel and Blade, featuring a responsive Bootstrap and Tailwind CSS interface, a MySQL backend, and interactive React components.",
    videoUrl: "",
    imageUrl: project1Img,
    liveUrl: "https://ag-entertainment-v2.vercel.app/",
    repoUrl: "https://github.com/liema-wapu2402/AG-ENTERTAINMENT-V2.git",
    tags: [
      "Blade",
      "Laravel",
      "CSS",
      "Bootstrap",
      "Tailwind CSS",
      "MySQL",
      "PHP",
      "JavaScript",
      "React",
      "Docker",
      "Vercel",
      "Render",
      "Aiven",
    ],
  },
  {
    title: "Portfolio Website",
    description:
      "My personal portfolio built with React and Tailwind CSS, featuring GSAP and Framer Motion animations with Lenis smooth scrolling.",
    videoUrl: "",
    imageUrl: project2Img,
    liveUrl:
      "https://portfolio-reyes-git-main-liema-wapu2402s-projects.vercel.app/",
    repoUrl: "https://github.com/liema-wapu2402/PORTFOLIO-REYES.git",
    tags: [
      "React",
      "Tailwind CSS",
      "GSAP",
      "Framer Motion",
      "Lenis",
      "Vercel",
      "Spline",
    ],
  },
  {
    title: "Unattended Human Occupant Detection Application",
    description: "",
    videoUrl: "",
    imageUrl: project3Img,
    liveUrl: "",
    repoUrl: "",
    tags: ["Java", "C++", "Android Studio"],
  },
  {
    title: "Paw Sanctuary",
    description:
      "An animal adoption website built with HTML, CSS, JavaScript, PHP, and Bootstrap that lets visitors browse pets and find a companion to adopt.",
    videoUrl: "",
    imageUrl: project4Img,
    liveUrl: "https://paw-avenue-sanctuary.vercel.app",
    repoUrl: "https://github.com/liema-wapu2402/PAW-AVENUE-SANCTUARY-V2.git",
    tags: [
      "Blade",
      "Laravel",
      "CSS",
      "Bootstrap",
      "Tailwind CSS",
      "PHP",
      "JavaScript",
      "React",
      "PostgreSQL",
      "Spline",
      "Docker",
      "Vercel",
      "Render",
      "Neon",
    ],
  },
  {
    title: "Wonderville Application",
    description:
      "An educational desktop game for children that builds basic knowledge through fun, interactive games, built with Java in the Eclipse IDE.",
    imageUrl: project5Img,
    liveUrl: "",
    repoUrl: "",
    tags: ["Java", "Eclipse"],
  },
  {
    title: "Reports Integration",
    description:
      "A reporting system that pulls data from multiple sources and report engines into one unified, exportable output (PDF, Excel, Word and CSV). Built with a Laravel API and a React + TypeScript frontend, deployed on Render, Vercel and Turso.",
    videoUrl: "",
    imageUrl: project6Img,
    liveUrl: "https://reports-integration-v2.vercel.app",
    repoUrl: "https://github.com/liema-wapu2402/REPORTS-INTEGRATION-V2",
    tags: [
      "Laravel",
      "PHP",
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "SQLite",
      "Turso",
      "Docker",
      "Vercel",
      "Render",
    ],
  },
];
