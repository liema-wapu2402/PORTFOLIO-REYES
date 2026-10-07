import { SITE } from '@/data/site';
import { GitHubIcon, LinkedInIcon, MailIcon, XIcon } from './SocialIcons';

/**
 * Builds the list of contact/social links from data/site.js.
 * Entries whose URL is empty are dropped, so unused accounts never render.
 * Used by both the contact section and the floating dock.
 */
export function getSocialLinks() {
  return [
    { name: 'GitHub', url: SITE.social.github, Icon: GitHubIcon },
    { name: 'LinkedIn', url: SITE.social.linkedin, Icon: LinkedInIcon },
    { name: 'X', url: SITE.social.x, Icon: XIcon },
    { name: 'Email', url: SITE.email ? `mailto:${SITE.email}` : '', Icon: MailIcon },
  ].filter((link) => link.url);
}
