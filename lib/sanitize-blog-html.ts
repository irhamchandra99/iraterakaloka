// Server use only: sanitize-html is heavy, keep it out of client bundles.
import sanitizeHtml from "sanitize-html";
import { toArticleHtml } from "./blog-content";

// Allow only the formats the admin editor can produce.
const options: sanitizeHtml.IOptions = {
  allowedTags: [
    "p",
    "br",
    "h2",
    "h3",
    "strong",
    "b",
    "em",
    "i",
    "ul",
    "ol",
    "li",
    "blockquote",
    "a",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  allowProtocolRelative: false,
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", {
      target: "_blank",
      rel: "noopener noreferrer nofollow",
    }),
  },
};

export function sanitizeBlogHtml(content: string | null | undefined) {
  return sanitizeHtml(toArticleHtml(content), options);
}
