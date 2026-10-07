import { ArrowUpRight } from 'lucide-react';
import { Section, SectionHeading } from '@/components/layout';
import ContactForm from './ContactForm';
import { getSocialLinks } from './socialLinks';

/**
 * ContactSection
 * --------------
 * Two columns from `lg` (1024px) up, stacked on smaller screens:
 *   left  (2/5): short intro + direct links
 *   right (3/5): the form inside a gradient .surface card
 * `lg:grid-cols-5` makes five equal tracks; `lg:col-span-2` / `lg:col-span-3`
 * choose how many tracks each side takes.
 */
export default function ContactSection() {
  const links = getSocialLinks();

  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-5 lg:gap-10">
        <div className="lg:col-span-2">
          <SectionHeading
            title="Let's work together"
            description="Have a project, an opportunity, or just a question? Send a message and I will get back to you."
          />

          <ul className="space-y-3">
            {links.map(({ name, url, Icon }) => (
              <li key={name}>
                <a
                  href={url}
                  target={url.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group surface surface-hover flex items-center gap-4 px-5 py-4"
                >
                  <Icon className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                  <span className="font-medium">{name}</span>
                  <ArrowUpRight className="ml-auto size-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface p-6 sm:p-8 lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
