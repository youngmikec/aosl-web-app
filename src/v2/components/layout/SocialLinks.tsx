import { SOCIAL_LINKS } from "../../constants/social";

// "dark" sits on the navy footer; "brand" uses each network's colour on light backgrounds.
export default function SocialLinks({ variant = "dark" }: { variant?: "dark" | "brand" }) {
  return (
    <ul className="flex items-center gap-3 list-none p-0 m-0">
      {SOCIAL_LINKS.map(({ label, href, Icon, brand }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`AOSL on ${label}`}
            title={label}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white transition-opacity hover:opacity-80"
            style={{ background: variant === "brand" ? brand : "rgba(255,255,255,0.12)" }}
          >
            <Icon size={16} />
          </a>
        </li>
      ))}
    </ul>
  );
}
