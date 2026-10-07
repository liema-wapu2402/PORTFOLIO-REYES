import { GraduationCap, Award } from 'lucide-react';
import { Section, SectionHeading } from '@/components/layout';
import { EDUCATION, CERTIFICATIONS } from './education.data';

/**
 * Education: a vertical timeline.
 *
 * TIMELINE LINE: the <ol> has `relative` and a `before:` pseudo-element
 * (before:absolute ... w-px) that draws a 1px vertical line at left-[0.9rem].
 * `bg-linear-to-b from-border via-border to-transparent` makes it fade out at the bottom.
 * Each <li> gets `pl-12` so the card starts to the right of the line, and its
 * icon badge is positioned `absolute left-0` so it sits on top of the line.
 */
export default function Education() {
  return (
    <Section id="education">
      <SectionHeading title="Education" description="Where I study and what I have completed." />

      <ol className="relative space-y-6 before:absolute before:bottom-2 before:left-[0.9rem] before:top-2 before:w-px before:bg-linear-to-b before:from-border before:via-border before:to-transparent">
        {EDUCATION.map((item) => (
          <li key={item.school} className="relative pl-12">
            {/* Badge sitting on the timeline */}
            <span className="absolute left-0 top-5 inline-flex size-[1.85rem] items-center justify-center rounded-full border border-border bg-background text-foreground">
              <GraduationCap className="size-4" />
            </span>

            <article className="surface p-6">
              <h3 className="text-lg font-semibold">{item.school}</h3>
              <p className="mt-1 text-foreground/90">{item.program}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.period}</p>
              {item.note && <p className="mt-3 text-sm text-muted-foreground">{item.note}</p>}
            </article>
          </li>
        ))}
      </ol>

      {/* Hidden automatically while CERTIFICATIONS is empty */}
      {CERTIFICATIONS.length > 0 && (
        <div className="mt-12">
          <h3 className="mb-5 text-xl font-semibold">Certifications</h3>
          <ul className="grid gap-4 sm:grid-cols-2">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert.title} className="surface flex items-start gap-3 p-5">
                <Award className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-medium">{cert.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer}
                    {cert.year ? ` · ${cert.year}` : ''}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
