import { HomeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dock, DockIcon } from '@/components/ui/dock';
import { getSocialLinks } from './socialLinks';

/**
 * SocialDock: the floating macOS-style dock at the bottom of the screen.
 *
 * - The wrapper is `fixed inset-x-0 bottom-5` (full width, 1.25rem from the bottom)
 *   and uses `pointer-events-none` so the empty space around the dock never blocks
 *   clicks; the dock itself turns pointer events back on (`pointer-events-auto`).
 * - The Dock's own look is overridden through its `className`:
 *     bg-card/70 + backdrop-blur-xl -> translucent frosted glass in light mode
 *     dark:bg-card/70               -> same in dark mode (replaces its default black)
 */
export default function SocialDock() {
  const links = getSocialLinks();

  const iconButton = cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'size-12 rounded-full');

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4">
      <TooltipProvider>
        <Dock className="pointer-events-auto border-border/70 bg-card/70 shadow-lg backdrop-blur-xl dark:bg-card/70">
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  aria-label="Back to top"
                  className={iconButton}
                >
                  <HomeIcon className="size-5" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Back to top</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <Separator orientation="vertical" className="h-full" />

          {links.map(({ name, url, Icon }) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={url}
                    target={url.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={name}
                    className={iconButton}
                  >
                    <Icon className="size-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        </Dock>
      </TooltipProvider>
    </div>
  );
}
