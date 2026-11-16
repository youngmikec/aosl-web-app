import { Link } from "react-router-dom";
import { NAVY, TEAL } from "../../theme/tokens";
import Newsletter from "../../components/layout/Newsletter";
import AboutSection from "../../components/sections/AboutSection";
import { Banner, Services } from "../home";

function PageHero() {
  return (
    <section style={{ background: NAVY, paddingTop: 80, paddingBottom: 80 }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ color: TEAL }}>About Us</span>
          </div>
          <h1 className="font-bold text-white" style={{ fontSize: 52, lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 640 }}>
            Trusted professional service.
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.65)", maxWidth: 520, lineHeight: 1.6 }}>
            Reliable support when you need it — care, transportation and training, tailored to every client.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero />
      <AboutSection background="white" />
      <Services />
      <Banner />
      <Newsletter />
    </>
  );
}
