import { SITE } from "@/data/site";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  XIcon,
} from "./SocialIcons";

/**
 * Builds the list of contact/social links from data/site.js.
 * Entries whose URL is empty are dropped, so unused accounts never render.
 * Each entry has:
 *   name  - short title ("GitHub")
 *   label - the visible value shown under the title ("github.com/liema-wapu2402")
 *   url   - the href
 * Used by both the contact section and the floating dock.
 */

const withProtocol = (url) => {
  if (!url) return "";
  return /^(https?:|mailto:|tel:)/i.test(url) ? url : `https://${url}`;
};

const prettyUrl = (url) =>
  url.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/, "");

// Turns a local PH number (09916178708) into a dialable tel: link (+639916178708).
function toTelUrl(phone) {
  if (!phone) return "";
  const digits = phone.replace(/[^\d+]/g, "");
  const international = digits.startsWith("0")
    ? `+63${digits.slice(1)}`
    : digits;
  return `tel:${international}`;
}

// 09916178708 -> "0991 617 8708" (falls back to the raw value for other formats)
function formatPhone(phone) {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  return digits.length === 11
    ? digits.replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3")
    : phone;
}

// mailto: and tel: links should open in the same tab, web links in a new one.
export const isExternalLink = (url) => !/^(mailto:|tel:)/.test(url);

export function getSocialLinks() {
  const github = withProtocol(SITE.social?.github);
  const linkedin = withProtocol(SITE.social?.linkedin);
  const x = withProtocol(SITE.social?.x);

  return [
    { name: "GitHub", url: github, label: prettyUrl(github), Icon: GitHubIcon },
    {
      name: "LinkedIn",
      url: linkedin,
      label: prettyUrl(linkedin),
      Icon: LinkedInIcon,
    },
    { name: "X", url: x, label: prettyUrl(x), Icon: XIcon },
    {
      name: "Email",
      url: SITE.email ? `mailto:${SITE.email}` : "",
      label: SITE.email || "",
      Icon: MailIcon,
    },
    {
      name: "Phone",
      url: toTelUrl(SITE.phone),
      label: formatPhone(SITE.phone),
      Icon: PhoneIcon,
    },
  ].filter((link) => link.url);
}
