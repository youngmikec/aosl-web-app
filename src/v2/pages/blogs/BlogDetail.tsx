import { FormEvent, useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaWhatsapp } from "react-icons/fa"
import { CORAL, MUTED, NAVY, OFF_WHITE, TEAL } from "../../theme/tokens"
import Newsletter from "../../components/layout/Newsletter"
import { useAuth } from "../../context/AuthContext"
import { useToast } from "../../context/ToastContext"
import { errorMessage, fetchBlogBySlug, fetchBlogComments, fetchBlogs, likeBlog, postBlogComment } from "../../services"
import type { BlogComment, BlogPost } from "../../models"
import { sanitizeHtml } from "../../utils/sanitizeHtml"
import { authorName, categoryLabel, formatDate, readingTime } from "./shared"

const LIKED_KEY = "aosl-liked-blogs"

const readLiked = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(LIKED_KEY) || "[]")
  } catch {
    return []
  }
}
const writeLiked = (ids: string[]) => {
  try {
    localStorage.setItem(LIKED_KEY, JSON.stringify(ids))
  } catch {
    // Storage can be blocked; the like still counts for this visit.
  }
}

const initials = (name: string) => name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "?"

function NotFound() {
  return (
    <section className="bg-white text-center" style={{ paddingTop: 120, paddingBottom: 120 }}>
      <h1 className="font-bold mb-3" style={{ fontSize: 32, color: NAVY }}>We couldn't find that article</h1>
      <p className="text-sm mb-8" style={{ color: MUTED }}>It may have been moved or unpublished.</p>
      <Link to="/blogs" className="font-semibold text-sm text-white rounded-full px-6 py-2.5" style={{ background: CORAL }}>
        Back to the blog
      </Link>
    </section>
  )
}

export default function BlogDetail() {
  const { slug = "" } = useParams()
  const { user } = useAuth()
  const { showError, showSuccess } = useToast()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [missing, setMissing] = useState(false)
  const [related, setRelated] = useState<BlogPost[]>([])
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)
  const [liking, setLiking] = useState(false)

  const [comments, setComments] = useState<BlogComment[]>([])
  const [commentTotal, setCommentTotal] = useState(0)
  const [commentForm, setCommentForm] = useState({ name: "", email: "", content: "" })
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)
    setMissing(false)
    setPost(null)
    fetchBlogBySlug(slug)
      .then((res) => {
        if (!active) return
        const found = (res.data.payload || [])[0]
        if (!found) return setMissing(true)
        setPost(found)
        setLikes(found.likes || 0)
        setLiked(readLiked().includes(found.id))
        window.scrollTo({ top: 0 })
      })
      .catch(() => active && setMissing(true))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [slug])

  useEffect(() => {
    if (!post) return
    let active = true
    fetchBlogs({ limit: 4, category: post.category })
      .then((res) => active && setRelated((res.data.payload || []).filter((p) => p.id !== post.id).slice(0, 3)))
      .catch(() => undefined)
    if (post.enableComments) {
      fetchBlogComments(post.id)
        .then((res) => {
          if (!active) return
          setComments(res.data.payload || [])
          setCommentTotal(res.data.metadata?.total ?? (res.data.payload || []).length)
        })
        .catch(() => undefined)
    }
    return () => {
      active = false
    }
  }, [post])

  const html = useMemo(() => sanitizeHtml(post?.content || ""), [post])
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  async function toggleLike() {
    if (!post || liking) return
    const next = !liked
    setLiking(true)
    setLiked(next)
    setLikes((n) => Math.max(0, n + (next ? 1 : -1)))
    try {
      await likeBlog(post.id, next ? "increase" : "decrease")
      const ids = readLiked().filter((id) => id !== post.id)
      writeLiked(next ? [...ids, post.id] : ids)
    } catch (err) {
      setLiked(!next)
      setLikes((n) => Math.max(0, n + (next ? -1 : 1)))
      showError(errorMessage(err, "We couldn't save your like."))
    } finally {
      setLiking(false)
    }
  }

  async function submitComment(event: FormEvent) {
    event.preventDefault()
    if (!post) return
    setPosting(true)
    try {
      await postBlogComment(
        user
          ? { blog: post.id, content: commentForm.content.trim(), isGuest: false, user: user.id }
          : { blog: post.id, content: commentForm.content.trim(), isGuest: true, commenterName: commentForm.name.trim(), commenterEmail: commentForm.email.trim() || undefined },
      )
      setCommentForm((f) => ({ ...f, content: "" }))
      showSuccess("Thanks — your comment has been posted.")
      const res = await fetchBlogComments(post.id)
      setComments(res.data.payload || [])
      setCommentTotal(res.data.metadata?.total ?? (res.data.payload || []).length)
    } catch (err) {
      showError(errorMessage(err, "We couldn't post your comment."))
    } finally {
      setPosting(false)
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl)
      showSuccess("Link copied.")
    } catch {
      showError("Copy isn't available in this browser.")
    }
  }

  if (loading) {
    return (
      <section className="bg-white" style={{ paddingTop: 80, paddingBottom: 120 }}>
        <div className="mx-auto px-6 animate-pulse" style={{ maxWidth: 820 }}>
          <div className="rounded-2xl mb-8" style={{ background: "#F3F2EF", height: 380 }} />
          <div className="rounded mb-3" style={{ background: "#F3F2EF", height: 28, width: "70%" }} />
          <div className="rounded" style={{ background: "#F3F2EF", height: 16, width: "40%" }} />
        </div>
      </section>
    )
  }
  if (missing || !post) return <NotFound />

  const author = authorName(post.author)
  const shareLinks = [
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${post.title} ${shareUrl}`)}`, Icon: FaWhatsapp },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, Icon: FaFacebookF },
    { label: "Twitter", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`, Icon: FaTwitter },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, Icon: FaLinkedinIn },
  ]

  return (
    <>
      <article className="bg-white" style={{ paddingTop: 56, paddingBottom: 80 }}>
        <div className="mx-auto px-6" style={{ maxWidth: 820 }}>
          <div className="flex items-center gap-2 text-sm mb-8" style={{ color: MUTED }}>
            <Link to="/" className="hover:underline">Home</Link>
            <span>›</span>
            <Link to="/blogs" className="hover:underline">Blog</Link>
            <span>›</span>
            <span style={{ color: NAVY }}>{categoryLabel(post.category)}</span>
          </div>

          <span className="inline-block text-xs font-bold uppercase tracking-widest rounded-full px-3 py-1 mb-5" style={{ background: "#E8F7F8", color: TEAL }}>
            {categoryLabel(post.category)}
          </span>
          <h1 className="font-bold" style={{ fontSize: 44, color: NAVY, lineHeight: 1.15, letterSpacing: "-0.02em" }}>{post.title}</h1>
          {post.subTitle && <p className="mt-4 leading-relaxed" style={{ fontSize: 20, color: "#4A4A6A" }}>{post.subTitle}</p>}

          <div className="flex flex-wrap items-center gap-4 mt-8 mb-8">
            <span className="grid place-items-center rounded-full font-bold text-white text-sm" style={{ width: 44, height: 44, background: NAVY }}>
              {initials(author)}
            </span>
            <div>
              <p className="font-semibold text-sm" style={{ color: NAVY }}>{author}</p>
              <p className="text-xs" style={{ color: MUTED }}>
                {formatDate(post.createdAt)}
                {post.createdAt ? " · " : ""}
                {readingTime(post.content)} min read
              </p>
            </div>
          </div>

          <img src={post.coverImage} alt="" className="w-full object-cover mb-10" style={{ borderRadius: 24, maxHeight: 460 }} />

          <div className="v2-prose" dangerouslySetInnerHTML={{ __html: html }} />

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs font-semibold rounded-full px-3 py-1.5" style={{ background: "#F3F2EF", color: "#4A4A6A" }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 mt-10 py-6 border-y" style={{ borderColor: "#EBEBF5" }}>
            <button
              type="button"
              onClick={toggleLike}
              disabled={liking}
              aria-pressed={liked}
              className="inline-flex items-center gap-2.5 font-semibold text-sm rounded-full px-5 py-2.5 border-2 transition-colors"
              style={{ borderColor: liked ? CORAL : "#E2E0DC", color: liked ? CORAL : "#4A4A6A", background: liked ? "#FFF0ED" : "white" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? CORAL : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.4-9.5 9-9.5 9Z" />
              </svg>
              {liked ? "Liked" : "Like"} · {likes}
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold mr-1" style={{ color: MUTED }}>Share</span>
              {shareLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Share on ${label}`}
                  title={label}
                  className="grid place-items-center rounded-full transition-opacity hover:opacity-80 text-white"
                  style={{ width: 36, height: 36, background: NAVY }}
                >
                  <Icon size={15} />
                </a>
              ))}
              <button type="button" onClick={copyLink} className="text-xs font-semibold rounded-full px-4 py-2 border" style={{ borderColor: "#E2E0DC", color: "#4A4A6A" }}>
                Copy link
              </button>
            </div>
          </div>

          {post.enableComments && (
            <section className="mt-12" aria-labelledby="comments-heading">
              <h2 id="comments-heading" className="font-bold mb-6" style={{ fontSize: 24, color: NAVY }}>
                Comments{commentTotal > 0 ? ` (${commentTotal})` : ""}
              </h2>
              <form onSubmit={submitComment} className="flex flex-col gap-4 p-6 mb-8" style={{ background: OFF_WHITE, borderRadius: 16 }}>
                {!user && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      required
                      value={commentForm.name}
                      onChange={(e) => setCommentForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      aria-label="Your name"
                      className="w-full border outline-none text-sm px-4 py-3 bg-white"
                      style={{ borderRadius: 10, borderColor: "#E2E0DC" }}
                    />
                    <input
                      type="email"
                      value={commentForm.email}
                      onChange={(e) => setCommentForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="Email (optional, never shown)"
                      aria-label="Email"
                      className="w-full border outline-none text-sm px-4 py-3 bg-white"
                      style={{ borderRadius: 10, borderColor: "#E2E0DC" }}
                    />
                  </div>
                )}
                <textarea
                  required
                  minLength={2}
                  maxLength={1000}
                  rows={4}
                  value={commentForm.content}
                  onChange={(e) => setCommentForm((f) => ({ ...f, content: e.target.value }))}
                  placeholder={user ? `Comment as ${user.firstName}…` : "Share your thoughts…"}
                  aria-label="Comment"
                  className="w-full border outline-none text-sm px-4 py-3 bg-white resize-none"
                  style={{ borderRadius: 10, borderColor: "#E2E0DC" }}
                />
                <button
                  type="submit"
                  disabled={posting}
                  className="self-start font-semibold text-sm text-white rounded-full px-7 py-3 transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ background: CORAL }}
                >
                  {posting ? "Posting…" : "Post comment"}
                </button>
              </form>
              {comments.length === 0 ? (
                <p className="text-sm" style={{ color: MUTED }}>No comments yet — be the first to share your thoughts.</p>
              ) : (
                <ul className="flex flex-col gap-5">
                  {comments.map((c) => (
                    <li key={c.id} className="flex gap-4">
                      <span className="grid place-items-center rounded-full font-bold text-xs shrink-0" style={{ width: 40, height: 40, background: "#E8F7F8", color: TEAL }}>
                        {initials(c.commenterName || "Guest")}
                      </span>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: NAVY }}>
                          {c.commenterName || "Guest"}
                          <span className="ml-2 text-xs font-normal" style={{ color: MUTED }}>{formatDate(c.createdAt)}</span>
                        </p>
                        <p className="text-sm leading-relaxed mt-1 whitespace-pre-wrap" style={{ color: "#4A4A6A" }}>{c.content}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section style={{ background: OFF_WHITE, paddingTop: 80, paddingBottom: 80 }}>
          <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
            <h2 className="font-bold mb-8" style={{ fontSize: 28, color: NAVY }}>More in {categoryLabel(post.category)}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {related.map((r) => (
                <Link key={r.id} to={`/blogs/view/${r.slug}`} className="group flex flex-col overflow-hidden bg-white transition-shadow hover:shadow-xl" style={{ borderRadius: 20, boxShadow: "0 2px 20px rgba(13,13,91,0.07)" }}>
                  <img src={r.coverImage} alt="" loading="lazy" className="w-full object-cover" style={{ height: 180 }} />
                  <div className="p-6">
                    <h3 className="font-bold leading-snug" style={{ fontSize: 18, color: NAVY }}>{r.title}</h3>
                    <p className="text-xs mt-3" style={{ color: MUTED }}>{formatDate(r.createdAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <Newsletter />
    </>
  )
}
