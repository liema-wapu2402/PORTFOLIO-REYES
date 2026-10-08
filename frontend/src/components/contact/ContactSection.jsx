import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/layout";
import ContactForm from "./ContactForm";
import { getSocialLinks, isExternalLink } from "./socialLinks";

/**
 * ContactSection
 * --------------
 * For visitors who want to message me (recruiters, clients, collaborators,
 * or anyone with a question).
 *
 * Layout: stacked on mobile, two columns from `lg` (1024px) up.
 *   left  (2/5): intro + direct contact links (each shows its real value)
 *   right (3/5): the message form inside a .surface card
 */
export default function ContactSection() {
  const links = getSocialLinks();

  return (
    <Section id="contact">
      <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-2">
          <SectionHeading
            title="Get in touch"
            description="Want to work together, offer an opportunity, or ask me something? Send me a message using the form and it goes straight to my inbox."
          />

          <p className="mb-4 text-sm font-medium text-muted-foreground">
            Prefer to reach me directly?
          </p>

          <ul className="space-y-3">
            {links.map(({ name, label, url, Icon }) => (
              <li key={name}>
                <a
                  href={url}
                  target={isExternalLink(url) ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group surface surface-hover flex items-center gap-4 px-4 py-3.5 sm:px-5 sm:py-4"
                >
                  <Icon className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium leading-tight">
                      {name}
                    </span>
                    <span className="block truncate text-sm text-muted-foreground">
                      {label}
                    </span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface p-5 sm:p-8 lg:col-span-3">
          <div className="mb-6">
            <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Send me a message
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              This form is for anyone who wants to message me. Leave your name
              and email so I can reply.
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
