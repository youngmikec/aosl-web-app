import { Link } from "react-router-dom";
import { CORAL, MUTED, NAVY, OFF_WHITE, TEAL } from "../../theme/tokens";
import { PHONE_DISPLAY, PHONE_HREF } from "../../constants/contact";

const PARAGRAPHS = [
  "We provide care, support, transportation and professional training services tailored to the individual needs of our clients.",
  "Our trained and competent team works collaboratively with every client to understand requirements, agree clear expectations and deliver a dependable, respectful service.",
  "Whether someone needs a few hours of weekly community support, regular assistance with daily activities or dependable transportation, AOSL is committed to providing a professional service that puts the person first.",
];

const HIGHLIGHTS = [
  "Professional and trained service team",
  "Flexible solutions tailored to individual needs",
  "Responsive communication and reliable support",
];

export default function AboutSection({ background = OFF_WHITE }: { background?: string }) {
  return (
    <section id="about" style={{ background, paddingTop: 100, paddingBottom: 100 }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Photo + 24/7 badge */}
          <div className="relative">
            <div className="overflow-hidden" style={{ borderRadius: 24 }}>
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=760&h=900&fit=crop&auto=format"
                alt="Team member presenting to colleagues in a planning meeting"
                className="w-full object-cover"
                style={{ height: 560 }}
              />
            </div>
            <div
              className="absolute -bottom-5 right-6 lg:-right-5 px-6 py-5 text-white"
              style={{ background: NAVY, borderRadius: 16, boxShadow: "0 12px 40px rgba(13,13,91,0.22)" }}
            >
              <p className="font-bold" style={{ fontSize: 28, lineHeight: 1 }}>24/7</p>
              <p className="text-xs mt-1.5 leading-snug" style={{ color: "rgba(255,255,255,0.7)" }}>
                Responsive<br />Support
              </p>
            </div>
            <div
              className="absolute -top-4 -left-4 opacity-30 hidden sm:block"
              style={{
                backgroundImage: `radial-gradient(${NAVY} 1px, transparent 1px)`,
                backgroundSize: "16px 16px",
                width: 80,
                height: 80,
              }}
            />
          </div>

          {/* Copy */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest mb-5 block" style={{ color: TEAL }}>About AOSL</span>
            <h2 className="font-bold leading-tight mb-6" style={{ fontSize: 36, color: NAVY, lineHeight: 1.2 }}>
              We connect clients with the right support solution.
            </h2>
            {PARAGRAPHS.map((text) => (
              <p key={text} className="mb-5 leading-relaxed" style={{ fontSize: 16, color: "#4A4A6A" }}>
                {text}
              </p>
            ))}

            <ol className="flex flex-col gap-3 mt-8 mb-9">
              {HIGHLIGHTS.map((text, i) => (
                <li key={text} className="flex items-center gap-4">
                  <span
                    className="flex items-center justify-center rounded-full font-bold shrink-0"
                    style={{ width: 32, height: 32, background: "#E8F7F8", color: TEAL, fontSize: 14 }}
                  >
                    {i + 1}
                  </span>
                  <span className="font-medium" style={{ color: NAVY, fontSize: 15 }}>{text}</span>
                </li>
              ))}
            </ol>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 font-semibold text-white rounded-full px-7 py-3.5 transition-opacity hover:opacity-90"
                style={{ background: CORAL, fontSize: 15 }}
              >
                Explore services
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a href={PHONE_HREF} className="flex items-center gap-3">
                <span className="flex items-center justify-center rounded-full shrink-0" style={{ width: 48, height: 48, background: "#E8F7F8" }}>
                  <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                    <path d="M3 3h4l2 5-2.5 2C7.8 13.2 9.5 15 13 16.5l2-2.5 5 2V19a1 1 0 0 1-1 1C7 20 2 13 2 6a1 1 0 0 1 1-1z" stroke={TEAL} strokeWidth="1.7" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <span className="block text-xs" style={{ color: MUTED }}>Call us now</span>
                  <span className="block font-bold" style={{ color: NAVY, fontSize: 17 }}>{PHONE_DISPLAY}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
