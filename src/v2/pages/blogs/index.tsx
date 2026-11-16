import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { CORAL, MUTED, NAVY, OFF_WHITE, TEAL } from "../../theme/tokens"
import Newsletter from "../../components/layout/Newsletter"
import { errorMessage, fetchBlogs } from "../../services"
import type { BlogPost } from "../../models"
import { authorName, categoryLabel, formatDate } from "./shared"

const PAGE = 9

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
            <span style={{ color: TEAL }}>Blog</span>
          </div>
          <h1 className="font-bold text-white" style={{ fontSize: 52, lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 680 }}>
            News, guidance and stories from AOSL.
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.65)", maxWidth: 560, lineHeight: 1.6 }}>
            Practical advice on care, transportation and training — written by the team that delivers it.
          </p>
        </div>
      </div>
    </section>
  )
}

function Cover({ post, height }: { post: BlogPost; height: number }) {
  return (
    <div className="overflow-hidden" style={{ background: OFF_WHITE }}>
      <img
        src={post.coverImage}
        alt=""
        loading="lazy"
        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ height }}
      />
    </div>
  )
}

function Meta({ post }: { post: BlogPost }) {
  return (
    <p className="text-xs" style={{ color: MUTED }}>
      {authorName(post.author)}
      {post.createdAt ? ` · ${formatDate(post.createdAt)}` : ""}
    </p>
  )
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-block text-xs font-bold uppercase tracking-widest rounded-full px-3 py-1" style={{ background: "#E8F7F8", color: TEAL }}>
      {categoryLabel(category)}
    </span>
  )
}

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [category, setCategory] = useState("ALL")
  const [query, setQuery] = useState("")
  const [shown, setShown] = useState(PAGE)

  useEffect(() => {
    let active = true
    fetchBlogs({ limit: 100 })
      .then((res) => active && setPosts(res.data.payload || []))
      .catch((err) => active && setError(errorMessage(err, "We couldn't load the blog right now.")))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  const categories = useMemo(() => Array.from(new Set(posts.map((p) => p.category))).sort(), [posts])
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter(
      (p) =>
        (category === "ALL" || p.category === category) &&
        (!q || `${p.title} ${p.subTitle || ""} ${(p.tags || []).join(" ")}`.toLowerCase().includes(q)),
    )
  }, [posts, category, query])

  const featured = category === "ALL" && !query.trim() ? filtered[0] : undefined
  const rest = featured ? filtered.slice(1) : filtered
  const visible = rest.slice(0, shown)

  return (
    <>
      <PageHero />
      <section className="bg-white" style={{ paddingTop: 56, paddingBottom: 100 }}>
        <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-10">
            <div className="flex flex-wrap gap-2">
              {["ALL", ...categories].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setCategory(c)
                    setShown(PAGE)
                  }}
                  className="text-sm font-semibold rounded-full px-4 py-2 transition-colors"
                  style={{
                    background: category === c ? NAVY : "#F3F2EF",
                    color: category === c ? "white" : "#4A4A6A",
                  }}
                >
                  {c === "ALL" ? "All posts" : categoryLabel(c)}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke={MUTED} strokeWidth="1.6" />
                <path d="M11 11l3 3" stroke={MUTED} strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setShown(PAGE)
                }}
                placeholder="Search articles"
                aria-label="Search articles"
                className="w-full border outline-none text-sm pl-10 pr-4 py-3"
                style={{ borderRadius: 12, borderColor: "#E2E0DC" }}
              />
            </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[0, 1, 2].map((n) => (
                <div key={n} className="rounded-2xl animate-pulse" style={{ background: "#F3F2EF", height: 380 }} />
              ))}
            </div>
          ) : error ? (
            <p role="alert" className="text-center py-20 text-sm" style={{ color: CORAL }}>{error}</p>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-semibold mb-2" style={{ color: NAVY }}>{posts.length === 0 ? "No articles yet" : "No articles match your search"}</p>
              <p className="text-sm" style={{ color: MUTED }}>
                {posts.length === 0 ? "Check back soon — new posts are on the way." : "Try a different keyword or category."}
              </p>
            </div>
          ) : (
            <>
              {featured && (
                <Link
                  to={`/blogs/view/${featured.slug}`}
                  className="group grid lg:grid-cols-2 gap-0 mb-12 overflow-hidden bg-white"
                  style={{ borderRadius: 24, boxShadow: "0 4px 32px rgba(13,13,91,0.09)" }}
                >
                  <Cover post={featured} height={380} />
                  <div className="p-8 lg:p-12 flex flex-col justify-center gap-4">
                    <CategoryBadge category={featured.category} />
                    <h2 className="font-bold" style={{ fontSize: 32, color: NAVY, lineHeight: 1.2 }}>{featured.title}</h2>
                    {featured.subTitle && <p className="leading-relaxed" style={{ color: "#4A4A6A" }}>{featured.subTitle}</p>}
                    <Meta post={featured} />
                    <span className="font-semibold text-sm inline-flex items-center gap-2" style={{ color: CORAL }}>
                      Read article
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke={CORAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visible.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blogs/view/${post.slug}`}
                    className="group flex flex-col overflow-hidden bg-white transition-shadow hover:shadow-xl"
                    style={{ borderRadius: 20, boxShadow: "0 2px 20px rgba(13,13,91,0.07)" }}
                  >
                    <Cover post={post} height={210} />
                    <div className="p-6 flex flex-col gap-3 flex-1">
                      <CategoryBadge category={post.category} />
                      <h3 className="font-bold leading-snug" style={{ fontSize: 20, color: NAVY }}>{post.title}</h3>
                      {post.subTitle && (
                        <p className="text-sm leading-relaxed" style={{ color: MUTED, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {post.subTitle}
                        </p>
                      )}
                      <div className="mt-auto pt-2"><Meta post={post} /></div>
                    </div>
                  </Link>
                ))}
              </div>

              {rest.length > shown && (
                <div className="text-center mt-12">
                  <button
                    type="button"
                    onClick={() => setShown((n) => n + PAGE)}
                    className="font-semibold text-sm rounded-full px-8 py-3 border-2 transition-colors hover:bg-gray-50"
                    style={{ borderColor: NAVY, color: NAVY }}
                  >
                    Load more articles
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <Newsletter />
    </>
  )
}
