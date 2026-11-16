// Blog content is HTML written in the admin's rich-text editor. It is rendered with dangerouslySetInnerHTML,
// so it is reduced to an allow-list of formatting tags first: no scripts, iframes, inline handlers or unsafe URLs.
const ALLOWED_TAGS = new Set([
  "p", "br", "strong", "b", "em", "i", "u", "s", "h1", "h2", "h3", "h4", "ul", "ol", "li", "blockquote", "a", "img",
  "code", "pre", "hr", "span", "div", "figure", "figcaption", "table", "thead", "tbody", "tr", "th", "td",
]);
const ALLOWED_ATTRS: Record<string, string[]> = {
  a: ["href", "title"],
  img: ["src", "alt", "title", "width", "height"],
};
const SAFE_URL = /^(https?:|mailto:|tel:|\/|#)/i;
const SAFE_IMAGE = /^(https?:|\/|data:image\/(png|jpe?g|gif|webp);base64,)/i;

export function sanitizeHtml(dirty: string): string {
  if (!dirty) return "";
  const doc = new DOMParser().parseFromString(`<body>${dirty}</body>`, "text/html");

  const clean = (node: Element) => {
    Array.from(node.children).forEach((child) => {
      const tag = child.tagName.toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) {
        // Drop dangerous elements entirely; keep the text of harmless unknown wrappers.
        if (["script", "style", "iframe", "object", "embed", "form", "input", "button", "svg", "math", "link", "meta"].includes(tag)) {
          child.remove();
        } else {
          clean(child);
          child.replaceWith(...Array.from(child.childNodes));
        }
        return;
      }
      const allowed = ALLOWED_ATTRS[tag] || [];
      Array.from(child.attributes).forEach((attr) => {
        const name = attr.name.toLowerCase();
        const isEditorClass = name === "class" && /^(ql-[a-z0-9-]+\s*)+$/.test(attr.value.trim());
        if (!allowed.includes(name) && !isEditorClass) child.removeAttribute(attr.name);
      });
      if (tag === "a") {
        const href = child.getAttribute("href") || "";
        if (!SAFE_URL.test(href.trim())) child.removeAttribute("href");
        child.setAttribute("rel", "noopener noreferrer nofollow");
        child.setAttribute("target", "_blank");
      }
      if (tag === "img") {
        const src = child.getAttribute("src") || "";
        if (!SAFE_IMAGE.test(src.trim())) {
          child.remove();
          return;
        }
        child.setAttribute("loading", "lazy");
      }
      clean(child);
    });
  };
  clean(doc.body);
  return doc.body.innerHTML;
}

export const plainText = (html: string) => (html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
