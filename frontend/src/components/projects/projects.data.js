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
    videoUrl:
      "https://res.cloudinary.com/dktapziq9/video/upload/v1764394626/1764393871242766_dqfnqn.mp4",
    imageUrl: project1Img,
    liveUrl: "https://sahityaasangamm.in",
    repoUrl: "",
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
    ],
  },
  {
    title: "Portfolio Website",
    description:
      "My personal portfolio built with React and Tailwind CSS, featuring GSAP and Framer Motion animations with Lenis smooth scrolling.",
    videoUrl:
      "https://res.cloudinary.com/dktapziq9/video/upload/v1764395075/1764395026924189_ij9257.mp4",
    imageUrl: project2Img,
    liveUrl: SITE.portfolioLiveUrl,
    repoUrl: SITE.portfolioRepoUrl,
    tags: ["React", "Tailwind CSS", "GSAP", "Framer Motion", "Lenis"],
  },
  {
    title: "Unattended Human Occupant Detection Application",
    description:
      "An Android application built with Java and C++ that detects unattended human occupants and raises alerts to help prevent accidents.",
    videoUrl:
      "https://res.cloudinary.com/dktapziq9/video/upload/v1764395357/1764395325884939_lrg7f4.mp4",
    imageUrl: project3Img,
    liveUrl: "https://ons-trading.onrender.com",
    repoUrl: "",
    tags: ["Java", "C++", "Android Studio"],
  },
  {
    title: "Paw Sanctuary",
    description:
      "An animal adoption website built with HTML, CSS, JavaScript, PHP, and Bootstrap that lets visitors browse pets and find a companion to adopt.",
    videoUrl:
      "https://res.cloudinary.com/dktapziq9/video/upload/v1764396382/1764396334647746_qruqaf.mp4",
    imageUrl: project4Img,
    liveUrl: "https://creatorhub.in",
    repoUrl: "",
    tags: ["Html", "CSS", "JavaScript", "PHP", "Bootstrap"],
  },
  {
    title: "Wonderville Application",
    description:
      "An educational desktop game for children that builds basic knowledge through fun, interactive games, built with Java in the Eclipse IDE.",
    imageUrl: project5Img,
    liveUrl: "https://teacountry.in",
    repoUrl: "",
    tags: ["Java", "Eclipse"],
  },
  {
    title: "Reports Integration",
    description:
      "A reporting system that pulls data from multiple sources and report engines into one unified, exportable output, built with Laravel and React.",
    videoUrl:
      "https://res.cloudinary.com/dktapziq9/video/upload/v1764397211/1764397136159111_zlcckk.mp4",
    imageUrl: project6Img,
    liveUrl: "https://scabbardtech.com",
    repoUrl: "",
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
    ],
  },
];
