# Amiel Andrei C. Reyes | Portfolio

Personal portfolio of **Amiel Andrei C. Reyes (AACR)**, built with React, Vite and Tailwind CSS v4.

- Light and dark theme: follows the visitor's system setting, with a toggle button in the top-right corner (the choice is remembered).
- Responsive layout from phones to wide desktops.
- Arctic gray / white / black palette with gradient, faded containers.

## Run it

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in frontend/dist
```

## Project structure

```
frontend/
  index.html                  title, fonts, no-flash theme script
  src/
    index.css                 design tokens (light/dark), reusable classes, all CSS explained
    main.jsx / App.jsx        entry point and page order
    data/site.js              YOUR name, roles, email, social links, form endpoint
    hooks/                    useSmoothScroll, useActiveSection
    lib/                      utils.ts (cn helper), scrollToSection.js
    components/
      layout/                 Navbar, Footer, Section, SectionHeading
      theme/                  ThemeProvider, ThemeToggle, useTheme
      hero/                   Hero
      about/                  About
      skills/                 Skills, SkillLogos, logoMap, skills.data.js
      projects/               Projects, ProjectCard, projects.data.js
      education/              Education, education.data.js
      contact/                ContactSection, ContactForm, SocialDock, SocialIcons, socialLinks.js
      effects/                RotatingText, ScrollReveal, ScrollVelocity, GlareHover, Magnet, CardSwap, Crosshair
      ui/                     shadcn/ui primitives (button, dock, tooltip, ...)
```

Each feature folder holds everything for that feature (components, data, helpers) and exposes it through an `index.js`.

## Make it yours (checklist)

1. `src/data/site.js`: email, GitHub, LinkedIn, resume link, and the Formspree endpoint (create a free form at formspree.io and paste its URL).
2. `src/components/projects/projects.data.js`: replace the sample projects with your own.
3. `src/components/education/education.data.js`: add your program and years.
4. `src/components/skills/skills.data.js`: choose which logos appear.

## How the theme works

`ThemeProvider` adds or removes the `dark` class on `<html>`. In `src/index.css`, the `.dark { ... }` block swaps every colour variable, and Tailwind's `dark:` prefix applies under that class. Components use semantic classes (`bg-background`, `text-foreground`, `border-border`) instead of fixed colours, so they restyle automatically. The CSS file explains each effect (gradients, glass blur, masks, gradient text) in comments.
