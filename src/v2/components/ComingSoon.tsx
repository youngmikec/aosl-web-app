import { Link } from "react-router-dom";
import { CORAL, MUTED, NAVY } from "../theme/tokens";

// Temporary stand-in for screens not yet ported; removed once every route has a real page.
export default function ComingSoon({ title }: { title: string }) {
  return (
    <section className="bg-white" style={{ paddingTop: 120, paddingBottom: 120 }}>
      <div className="mx-auto px-6 text-center" style={{ maxWidth: 560 }}>
        <h1 className="font-bold mb-3" style={{ fontSize: 32, color: NAVY }}>{title}</h1>
        <p className="text-sm mb-8" style={{ color: MUTED }}>This page is being rebuilt. Please check back soon.</p>
        <Link to="/" className="font-semibold text-sm text-white rounded-full px-6 py-2.5" style={{ background: CORAL }}>
          Back to home
        </Link>
      </div>
    </section>
  );
}
