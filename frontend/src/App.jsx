import useSmoothScroll from "@/hooks/useSmoothScroll";
import { Navbar, Footer } from "@/components/layout";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
import { ContactSection, SocialDock } from "@/components/contact";

/**
 * App: page order and global behaviour.
 *
 * `bg-background text-foreground` here (and on <body> in index.css) is what
 * switches the whole page between light and dark: both read CSS variables that
 * change when <html> has the `dark` class (see ThemeProvider).
 */
export default function App() {
  useSmoothScroll();

  return (
    <div className="relative min-h-svh bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Experience />
        <ContactSection />
      </main>
      <Footer />
      <SocialDock />
    </div>
  );
}
