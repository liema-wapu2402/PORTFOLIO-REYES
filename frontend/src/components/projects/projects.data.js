import { SITE } from '@/data/site';

import project1Img from '@/assets/projects/project1.png';
import project2Img from '@/assets/projects/project2.png';
import project5Img from '@/assets/projects/project5.png';
import project6Img from '@/assets/projects/project6.png';
import project7Img from '@/assets/projects/project7.png';
import project8Img from '@/assets/projects/project8.png';
import project9Img from '@/assets/projects/project9.png';

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
 *
 * TODO: these entries came with the template. Replace them with your own work.
 */
export const PROJECTS = [
  {
    title: 'Sahityaa Sangamm',
    description: 'A modern e-commerce platform built with Blade and Laravel.',
    videoUrl: 'https://res.cloudinary.com/dktapziq9/video/upload/v1764394626/1764393871242766_dqfnqn.mp4',
    imageUrl: project1Img,
    liveUrl: 'https://sahityaasangamm.in',
    repoUrl: '',
    tags: ['Blade', 'Laravel', 'MySQL'],
  },
  {
    title: 'Portfolio Website',
    description: 'My personal portfolio website built with React and Tailwind CSS.',
    videoUrl: 'https://res.cloudinary.com/dktapziq9/video/upload/v1764395075/1764395026924189_ij9257.mov',
    imageUrl: project7Img,
    liveUrl: SITE.portfolioLiveUrl,
    repoUrl: SITE.portfolioRepoUrl,
    tags: ['React', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Lenis'],
  },
  {
    title: 'ONS Trading Application',
    description: 'A real-time trading application using Django and Bootstrap 5.',
    videoUrl: 'https://res.cloudinary.com/dktapziq9/video/upload/v1764395357/1764395325884939_lrg7f4.mp4',
    imageUrl: project5Img,
    liveUrl: 'https://ons-trading.onrender.com',
    repoUrl: '',
    tags: ['Django', 'yfinance', 'Bootstrap 5'],
  },
  {
    title: 'Creatorhub',
    description: 'An influencer marketing platform for creators and brands built with React.',
    videoUrl: 'https://res.cloudinary.com/dktapziq9/video/upload/v1764396382/1764396334647746_qruqaf.mp4',
    liveUrl: 'https://creatorhub.in',
    repoUrl: '',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'Tea Country',
    description: 'A tourism website created with React.',
    imageUrl: project2Img,
    liveUrl: 'https://teacountry.in',
    repoUrl: '',
    tags: ['React', 'Vue', 'Tailwind CSS'],
  },
  {
    title: 'Scabbard Tech',
    description: 'A digital marketing website built with React, Vue and Tailwind CSS.',
    videoUrl: 'https://res.cloudinary.com/dktapziq9/video/upload/v1764397211/1764397136159111_zlcckk.mp4',
    liveUrl: 'https://scabbardtech.com',
    repoUrl: '',
    tags: ['React', 'Vue', 'Tailwind CSS'],
  },
  {
    title: 'Jana Kalyan Swastha Sewa',
    description: 'A healthcare website built with HTML and PHP.',
    imageUrl: project6Img,
    liveUrl: 'https://jkssewa.org',
    repoUrl: '',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
  },
  {
    title: 'Janasewa',
    description: 'An NGO website built with HTML, CSS and JavaScript.',
    imageUrl: project8Img,
    liveUrl: 'https://janasewa.org',
    repoUrl: '',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Earmacs',
    description: 'A hotel management website built with WordPress and PHP.',
    imageUrl: project9Img,
    liveUrl: 'https://earmacs.com',
    repoUrl: '',
    tags: ['WordPress', 'PHP'],
  },
];
