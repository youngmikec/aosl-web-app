import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CORAL, NAVY, TEXT } from "../../theme/tokens";
import { useAuth } from "../../context/AuthContext";
import Logo from "./Logo";

const NAV_LINKS: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about-us" },
  { label: "Services", to: "/services" },
  { label: "Jobs & Training", to: "/jobs-trainings" },
  { label: "Blog", to: "/blogs" },
  { label: "FAQs", to: "/faqs" },
  { label: "Contact", to: "/contact-us" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const linkStyle = ({ isActive }: { isActive: boolean }) => ({ color: isActive ? CORAL : TEXT });

  return (
    <nav
      className="sticky top-0 z-50 bg-white border-b border-gray-100"
      style={{ boxShadow: "0 1px 12px rgba(13,13,91,0.07)" }}
    >
      <div className="mx-auto flex items-center justify-between px-6" style={{ maxWidth: 1200, height: 72 }}>
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <Logo />
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={linkStyle}
            >
              {l.label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <Link
              to="/users-dashboard"
              className="text-sm font-semibold text-white rounded-full px-5 py-2.5 transition-opacity hover:opacity-90"
              style={{ background: CORAL }}
            >
              My Dashboard
            </Link>
          ) : (
            <>
              <Link to="/sign-in" className="text-sm font-medium" style={{ color: TEXT }}>
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="text-sm font-semibold text-white rounded-full px-5 py-2.5 transition-opacity hover:opacity-90"
                style={{ background: CORAL }}
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <div className="space-y-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="block w-6 h-0.5" style={{ background: NAVY }} />
            ))}
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className="text-sm font-medium" style={{ color: TEXT }}>
              {l.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <Link to="/users-dashboard" className="text-sm font-semibold text-white rounded-full px-5 py-2.5 text-center" style={{ background: CORAL }}>
              My Dashboard
            </Link>
          ) : (
            <>
              <Link to="/sign-in" onClick={() => setMenuOpen(false)} className="text-sm font-medium" style={{ color: TEXT }}>
                Sign In
              </Link>
              <Link to="/sign-up" className="text-sm font-semibold text-white rounded-full px-5 py-2.5 text-center" style={{ background: CORAL }}>
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
