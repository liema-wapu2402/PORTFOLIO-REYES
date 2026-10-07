/**
 * SectionHeading: title + optional description used at the top of each section.
 *
 * The small line under the title is a gradient that fades to transparent:
 *   bg-linear-to-r from-foreground/50 to-transparent
 * `/50` is Tailwind's opacity modifier (50% of the foreground colour), so the
 * line is dark in light mode, light in dark mode, and dissolves to the right.
 *
 * `text-balance` asks the browser to even out line lengths in multi-line headings.
 */
export default function SectionHeading({ title, description }) {
  return (
    <div className="mb-12 max-w-2xl sm:mb-14">
      <h2 className="text-balance text-3xl font-semibold sm:text-4xl">{title}</h2>
      <div aria-hidden="true" className="mt-4 h-px w-28 bg-linear-to-r from-foreground/50 to-transparent" />
      {description && (
        <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
