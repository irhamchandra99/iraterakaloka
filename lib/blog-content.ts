// Shared helpers for blog article content (client and server safe).
// New articles are stored as HTML from the TipTap editor. Older articles
// may still be plain text, so convert them before editing or rendering.

const HTML_TAG = /<\/?[a-z][a-z0-9]*(\s[^>]*)?\/?>/i;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function isHtmlContent(content: string) {
  return HTML_TAG.test(content);
}

// Plain text: blank lines become paragraphs, single newlines become <br>.
export function plainTextToHtml(content: string) {
  return content
    .replace(/\r\n?/g, "\n")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

export function toArticleHtml(content: string | null | undefined) {
  if (!content) return "";
  return isHtmlContent(content) ? content : plainTextToHtml(content);
}

// True when the HTML has no visible text (e.g. "<p></p>" from an empty editor).
export function isContentEmpty(html: string) {
  return (
    html
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim().length === 0
  );
}
