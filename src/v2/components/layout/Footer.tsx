import { Link } from "react-router-dom";
import { NAVY, TEAL } from "../../theme/tokens";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import { PHONE_DISPLAY } from "../../constants/contact";

type FooterLink = { label: string; to: string };

const COLUMNS: { head: string; links: FooterLink[] }[] = [
  {
    head: "About",
    links: [
      { label: "Our Story", to: "/about-us" },
      { label: "Careers", to: "/jobs-trainings" },
    ],
  },
  {
    head: "Quick Links",
    links: [
      { label: "Home", to: "/" },
      { label: "Services", to: "/services" },
      { label: "Blog", to: "/blogs" },
      { label: "FAQs", to: "/faqs" },
      { label: "Contact", to: "/contact-us" },
    ],
  },
  {
    head: "Services",
    links: [
      { label: "Personal Assistant", to: "/services/personal-assistant" },
      { label: "Transportation", to: "/services/transportation" },
      { label: "Training", to: "/services/training" },
    ],
  },
];

const CONTACT_LINES = [PHONE_DISPLAY, "info@aosl-online.com", "Mon–Fri 8am–7pm", "24/7 Emergency Line"];

export default function Footer() {
  return (
    <footer style={{ background: NAVY }}>
      <div className="mx-auto px-6 pt-16 pb-8" style={{ maxWidth: 1200 }}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <Logo light />
            </Link>
            <p className="text-xs leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
              All Occupation Service Ltd. Delivering dignified care across the United Kingdom.
            </p>
            <SocialLinks />
          </div>
          {COLUMNS.map((col) => (
            <div key={col.head}>
              <p className="text-xs font-bold uppercase tracking-widest mb-5 text-white">{col.head}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-xs transition-colors hover:opacity-100" style={{ color: "rgba(255,255,255,0.5)" }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-5 text-white">Contact</p>
            <ul className="space-y-3">
              {CONTACT_LINES.map((l) => (
                <li key={l} className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{l}</li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.35)" }}
        >
          <p>&copy; {new Date().getFullYear()} All Occupation Service Ltd. All rights reserved.</p>
          <span style={{ color: TEAL }}>Regulated care services in the UK</span>
        </div>
      </div>
    </footer>
  );
}
